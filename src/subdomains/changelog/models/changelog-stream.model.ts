/**
 * @file Models - ChangelogStream
 * @module grease/changelog/models/ChangelogStream
 */

import type { ChangelogOperation } from '#src/changelog/operations'
import type { ChangelogChunk } from '#src/changelog/types'
import type { Commit } from '#src/git'
import { LogLevel, type LoggerService } from '#src/log'
import type { StreamCallback } from '#src/types'
import {
  at,
  cast,
  get,
  isNull,
  pick,
  type Nilable,
  type Nullable,
  type Optional
} from '@flex-development/tutils'
import type { Abortable } from 'node:events'
import fs from 'node:fs'
import stream from 'node:stream'
import util from 'node:util'
import ChangelogEntry from './changelog-entry.model'
import type ChangelogFormatter from './changelog-formatter.model'
import ChangelogInfile from './changelog-infile.model'

/**
 * Changelog stream options.
 *
 * @see {@linkcode Abortable}
 *
 * @template T - Parsed commit type
 *
 * @extends {Abortable}
 */
interface ChangelogStreamDTO<T extends Commit = Commit> extends Abortable {
  /**
   * Do not automatically end the writable side of the stream when the readable
   * side ends.
   *
   * @default true
   */
  allowHalfOpen?: Optional<boolean>

  /**
   * Changelog entry objects.
   *
   * @see {@linkcode ChangelogEntry}
   *
   * @default []
   */
  entries?: Optional<readonly ChangelogEntry<T>[]>

  /**
   * Logger instance.
   *
   * @see {@linkcode LoggerService}
   */
  logger: LoggerService

  /**
   * Changelog operation being executed.
   *
   * @see {@linkcode ChangelogOperation}
   */
  operation: ChangelogOperation<T>
}

/**
 * Stream write options.
 *
 * @internal
 *
 * @see {@linkcode BufferEncoding}
 * @see {@linkcode StreamCallback}
 */
type WriteOptions = BufferEncoding | StreamCallback

/**
 * Changelog stream model.
 *
 * @see {@linkcode Commit}
 * @see {@linkcode stream.Transform}
 *
 * @template T - Parsed commit type
 *
 * @class
 * @extends {stream.Transform}
 */
class ChangelogStream<T extends Commit = Commit> extends stream.Transform {
  /**
   * Changelog chunk index.
   *
   * @protected
   * @instance
   * @member {number} cdx
   */
  protected cdx: number

  /**
   * Changelog chunks.
   *
   * @see {@linkcode ChangelogEntry}
   * @see {@linkcode ChangelogInfile}
   *
   * @protected
   * @readonly
   * @instance
   * @member {ReadonlyArray<ChangelogEntry<T> | ChangelogInfile>} chunks
   */
  protected readonly chunks: readonly [
    ...ChangelogEntry<T>[],
    Nullable<ChangelogInfile>
  ]

  /**
   * Debug mode enabled?
   *
   * @public
   * @readonly
   * @instance
   * @member {boolean} debug
   */
  public readonly debug: boolean

  /**
   * Changelog formatter.
   *
   * @see {@linkcode ChangelogFormatter}
   *
   * @protected
   * @readonly
   * @instance
   * @member {ChangelogFormatter} formatter
   */
  protected readonly formatter: ChangelogFormatter

  /**
   * Stream logger.
   *
   * @see {@linkcode LoggerService}
   *
   * @protected
   * @readonly
   * @instance
   * @member {LoggerService} logger
   */
  protected readonly logger: LoggerService

  /**
   * The changelog operation being executed.
   *
   * @see {@linkcode ChangelogOperation}
   *
   * @protected
   * @readonly
   * @instance
   * @member {Readonly<ChangelogOperation<T>>} operation
   */
  protected readonly operation: Readonly<ChangelogOperation<T>>

  /**
   * Changelog entries writer.
   *
   * @see {@linkcode stream.Writable}
   *
   * @public
   * @readonly
   * @instance
   * @member {stream.Writable} writer
   */
  public readonly writer: stream.Writable

  /**
   * Create a new changelog stream.
   *
   * @see {@linkcode ChangelogStreamDTO}
   *
   * @param {ChangelogStreamDTO<T>} opts - Changelog stream options
   */
  constructor(opts: ChangelogStreamDTO<T>) {
    super({
      allowHalfOpen: get(opts, 'allowHalfOpen', true),
      decodeStrings: false,
      defaultEncoding: 'utf8',
      encoding: 'utf8',
      objectMode: true,
      signal: opts.signal
    })

    this.cdx = 0
    this.formatter = new opts.operation.Formatter()
    this.logger = opts.logger
    this.operation = Object.freeze(opts.operation)
    this.writer = this.operation.write && this.operation.outfile
      ? fs.createWriteStream(this.operation.outfile, { flags: 'w+' })
      : process.stdout

    this.logger.sync(this.operation)
    this.debug = this.logger.level >= LogLevel.DEBUG
    this.pause()

    this.chunks = <ChangelogStream<T>['chunks']>Object.freeze([
      ...get(opts, 'entries', []),
      this.operation.infile && this.operation.releases
        ? ((): Nullable<ChangelogInfile> => {
          const { cwd, infile } = this.operation

          try {
            /**
             * Changelog infile chunk.
             *
             * @const {ChangelogInfile} chunk
             */
            const chunk: ChangelogInfile = new ChangelogInfile(infile, cwd)

            this.logger.debug('infile chunk received', chunk.path)
            return chunk
          } catch (e: unknown) {
            const { cause, message } = <Error>e

            /* c8 ignore next */ if (message !== 'invalid infile') throw e
            this.logger.debug('infile not found', get(cause, 'infile'))

            return null
          }
        })()
        : null
    ])
  }

  /**
   * Handle a destroyed stream.
   *
   * @see {@linkcode StreamCallback}
   * @see https://nodejs.org/api/stream.html#readable_destroyerr-callback
   * @see https://nodejs.org/api/stream.html#writable_destroyerr-callback
   *
   * @public
   * @override
   *
   * @param {Nilable<Error>} err - Possible error
   * @param {StreamCallback} cb - Destroy callback
   * @return {void} Nothing when complete
   */
  public override _destroy(err: Nilable<Error>, cb: StreamCallback): void {
    return void cb(err)
  }

  /**
   * Fetch initial stream data.
   *
   * @see https://nodejs.org/api/stream.html#readable_readsize
   *
   * @public
   * @override
   *
   * @param {number} n - Number of chunks to read
   * @return {void} Nothing when complete
   */
  public override _read(n: number): void {
    // add spacer chunk for readability when running operation in debug mode
    this.debug && !this.operation.write && this.unshift('')

    // add n number of changelog chunks
    if (this.cdx < this.chunks.length) {
      for (let i = this.cdx; i < this.cdx + n; i++) {
        /**
         * Possible changelog chunk.
         *
         * @const {ChangelogChunk<T> | -1} chunk
         */
        const chunk: ChangelogChunk<T> | -1 = at(this.chunks, i, -1)

        // exit early if there are no more chunks to fetch
        if (chunk === -1) break

        // add changelog chunk
        this.logger.debug(util.inspect(chunk, pick(this.operation, ['colors'])))
        this.push(chunk)
        this.cdx++
      }
    }

    return void this.push(null)
  }

  /**
   * Transform a changelog `chunk`.
   *
   * @see {@linkcode BufferEncoding}
   * @see {@linkcode ChangelogChunk}
   * @see {@linkcode stream.TransformCallback}
   * @see https://nodejs.org/api/stream.html#transform_transformchunk-encoding-callback
   *
   * @public
   *
   * @param {ChangelogChunk<T>} chunk - Chunk to transform
   * @param {BufferEncoding} encoding - Buffer encoding (ignored)
   * @param {stream.TransformCallback} cb - Transform callback
   * @return {void} Nothing when complete
   */
  public override _transform(
    chunk: ChangelogChunk<T>,
    encoding: BufferEncoding,
    cb: stream.TransformCallback
  ): void {
    // format changelog entry
    if (chunk instanceof ChangelogEntry) {
      chunk = this.formatter.formatEntry(chunk)
    }

    // stringify stringafiable chunks
    !isNull(chunk) && (chunk = chunk.toString() + '\n')

    return void cb(null, chunk)
  }

  /**
   * Send a `chunk` to the {@linkcode writer}.
   *
   * @see {@linkcode BufferEncoding}
   * @see {@linkcode ChangelogChunk}
   * @see {@linkcode StreamCallback}
   * @see https://nodejs.org/api/stream.html#writable_writechunk-encoding-callback
   *
   * @public
   * @override
   *
   * @param {ChangelogChunk<T>} chunk - Chunk to write
   * @param {BufferEncoding} encoding - Buffer encoding
   * @param {StreamCallback} cb - Write callback
   * @return {void} Nothing when complete
   */
  public override _write(
    chunk: ChangelogChunk<T>,
    encoding: BufferEncoding,
    cb: StreamCallback
  ): void {
    return void this._transform(chunk, encoding, (e, chunk): void => {
      if (e) return void cb(e)
      if (isNull(chunk)) return void cb(chunk)
      return void this.writer.write(chunk, encoding, cb)
    })
  }

  /**
   * Print `this` changelog stream.
   *
   * Changelog entries are written to {@linkcode process.stdout} if writing to
   * file is disabled, or `operation.outfile` otherwise.
   *
   * @see {@linkcode writer}
   *
   * @public
   *
   * @return {this} `this` changelog stream
   */
  public print(): this {
    return this.pipe(this)
  }

  /**
   * Add a changelog `chunk` to the read queue.
   *
   * Passing `chunk` as `null` signals the end of the stream (EOF), after which
   * no more data can be written. The EOF signal is put at the end of the buffer
   * and any buffered data will still be flushed.
   *
   * Changelog entry chunks will be formatted before being inserted.
   *
   * @see {@linkcode ChangelogChunk}
   * @see https://nodejs.org/api/stream.html#readablepushchunk-encoding
   *
   * @public
   * @override
   *
   * @param {ChangelogChunk<T>} chunk - Chunk to add
   * @return {boolean} `true` if more chunks can be added; `false` otherwise
   */
  public override push(chunk: ChangelogChunk<T>): boolean {
    return super.push(chunk, this.readableEncoding!)
  }

  /**
   * Read data out of the internal buffer.
   *
   * The `chunks` argument specifies a specific number of chunks to read. If the
   * specified number of chunks cannot be read, `null` will be returned *unless*
   * the stream has ended, in which case all of the data remaining in the
   * internal buffer will be returned.
   *
   * The `changelog.read()` method should only be called on `ChangelogStream`
   * streams operating in paused mode. In flowing mode, `changelog.read()` is
   * called automatically until the internal buffer is fully drained.
   *
   * @public
   * @override
   *
   * @param {number?} [chunks=1] - Number of chunks to read
   * @return {ChangelogChunk<T>} Changelog chunk
   */
  public override read(chunks: number = 1): ChangelogChunk<T> {
    return <ChangelogChunk<T>>super.read(chunks)
  }

  /**
   * Unshift a changelog `chunk` onto the read queue.
   *
   * Passing `chunk` as `null` signals the end of the stream (EOF), after which
   * no more data can be written. The EOF signal is put at the end of the buffer
   * and any buffered data will still be flushed.
   *
   * Changelog entry chunks will be formatted before being inserted.
   *
   * @see {@linkcode ChangelogChunk}
   * @see https://nodejs.org/api/stream.html#readableunshiftchunk-encoding
   *
   * @public
   * @override
   *
   * @param {ChangelogChunk<T>} chunk - Chunk to prepend
   * @return {void} Nothing when complete
   */
  public override unshift(chunk: ChangelogChunk<T>): void {
    return void super.unshift(chunk, this.readableEncoding!)
  }

  /**
   * Write data to `this` stream.
   *
   * @see {@linkcode ChangelogChunk}
   * @see {@linkcode StreamCallback}
   * @see {@linkcode WriteOptions}
   * @see {@linkcode stream.Transform.write}
   *
   * @public
   * @override
   *
   * @param {ChangelogChunk<T>} chunk - Chunk to write
   * @param {WriteOptions?} [opts] - Buffer encoding or write callback
   * @param {StreamCallback?} [cb] - Write callback
   * @return {boolean} `true` if internal buffer is less than `highWaterMark`
   */
  public override write(
    chunk: ChangelogChunk<T>,
    opts?: WriteOptions,
    cb?: StreamCallback
  ): boolean {
    return super.write(chunk, cast(opts), cb)
  }
}

export { ChangelogStream as default, type ChangelogStreamDTO }
