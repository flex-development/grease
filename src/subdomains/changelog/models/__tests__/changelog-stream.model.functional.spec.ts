/**
 * @file Functional Tests - ChangelogStream
 * @module grease/changelog/models/tests/functional/ChangelogStream
 */

import infile from '#fixtures/changelog/infile'
import today from '#fixtures/changelog/today'
import git from '#fixtures/git.service'
import sha from '#fixtures/git/grease/sha'
import tagprefix from '#fixtures/git/grease/tagprefix'
import logger from '#fixtures/logger.service'
import { ChangelogOperation } from '#src/changelog/operations'
import { ChangelogQueryHandler } from '#src/changelog/queries'
import type { ChangelogChunk } from '#src/changelog/types'
import { LoggerService } from '#src/providers'
import type { StreamCallback } from '#src/types'
import type { Mock } from '#tests/interfaces'
import pathe from '@flex-development/pathe'
import { at, join, select, type Nullable } from '@flex-development/tutils'
import tempfile from 'tempfile'
import TestSubject from '../changelog-stream.model'

describe('functional:changelog/models/ChangelogStream', () => {
  let encoding: BufferEncoding

  beforeAll(() => {
    vi.setSystemTime(today)
    encoding = 'utf8'
  })

  describe('constructor', () => {
    let debug: Mock<LoggerService['debug']>

    beforeAll(() => {
      debug = vi.fn().mockName('logger.debug')
    })

    beforeEach(() => {
      vi.spyOn(logger, 'debug').mockImplementation(debug)
    })

    it('should add infile chunk if infile is found', () => {
      // Act
      const subject = new TestSubject({
        logger,
        operation: new ChangelogOperation({ infile, tagprefix, to: sha })
      })

      // Expect
      expect(subject).to.have.property('chunks').be.an('array').of.length(1)
      expect(subject.read()?.toString()).toMatchSnapshot()
    })

    it('should handle missing infile', () => {
      // Arrange
      const cwd: string = '__fixtures__/git/grease'
      const infile: string = 'CHANGELOG.md'
      const path: string = pathe.resolve(cwd, infile)

      // Act
      const subject = new TestSubject({
        logger,
        operation: new ChangelogOperation({ cwd, infile, tagprefix, to: sha })
      })

      // Expect
      expect(debug).toHaveBeenCalledOnce()
      expect(debug).toHaveBeenCalledWith('infile not found', path)
      expect(subject).to.have.deep.property('chunks', [null])
    })
  })

  describe('#_destroy', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({
        logger,
        operation: new ChangelogOperation({ tagprefix, to: sha })
      })
    })

    it('should handle err', () => {
      // Arrange
      const cb: Mock<StreamCallback> = vi.fn().mockName('cb')
      const err: Nullable<Error> = null

      // Act
      subject._destroy(err, cb)

      // Expect
      expect(cb).toHaveBeenCalledOnce()
      expect(cb).toHaveBeenCalledWith(err)
    })
  })

  describe('#_write', () => {
    let cb: Mock<StreamCallback>
    let subject: TestSubject
    let write: Mock<TestSubject['writer']['write']>

    beforeAll(() => {
      subject = new TestSubject({
        logger,
        operation: new ChangelogOperation({ tagprefix, to: sha })
      })

      cb = vi.fn().mockName('cb')
      write = vi.fn().mockName('writer.write')
    })

    beforeEach(() => {
      vi.spyOn(subject.writer, 'write').mockImplementationOnce(write)

      vi.spyOn(subject, '_transform').mockImplementation((chk, enc, cb) => {
        return void (chk === 'error' ? cb(new Error(`${chk}`)) : cb(null, chk))
      })
    })

    it('should handle #_transform error', () => {
      // Act
      subject._write('error', encoding, cb)

      // Expect
      expect(cb).toHaveBeenCalledOnce()
      expect(cb).toHaveBeenCalledWith(expect.any(Error))
      expect(write).not.toHaveBeenCalled()
    })

    it('should send chunk to writer', () => {
      // Arrange
      const chunk: string = 'chunk'

      // Act
      subject._write(chunk, encoding, cb)

      // Expect
      expect(write).toHaveBeenCalledOnce()
      expect(write).toHaveBeenCalledWith(chunk, encoding, cb)
    })

    it('should skip write if chunk is null', () => {
      // Arrange
      const chunk: ChangelogChunk = null

      // Act
      subject._write(chunk, encoding, cb)

      // Expect
      expect(cb).toHaveBeenCalledOnce()
      expect(cb).toHaveBeenCalledWith(chunk)
    })
  })

  describe('#print', () => {
    let operation: ChangelogOperation
    let subject: TestSubject

    beforeAll(async () => {
      operation = new ChangelogOperation({
        outfile: tempfile({ extension: 'md' }),
        releases: 3,
        tagprefix,
        to: sha,
        write: true
      })

      subject = new TestSubject({
        entries: await new ChangelogQueryHandler(git).execute(operation),
        logger,
        operation
      })
    })

    beforeEach(() => {
      vi.spyOn(subject.writer, 'write')
    })

    it.extend<{ writes: string[] }>({
      writes: async ({}, use): Promise<void> => {
        subject.on('unpipe', () => {
          const { mock: write } = vi.mocked(subject.writer.write)
          return void use(select(write.calls, null, c => <string>at(c, 0)))
        })

        return void subject.print()
      }
    })('should write changelog entries', ({ writes }) => {
      expect(join(writes, '')).toMatchSnapshot()
    })
  })
})
