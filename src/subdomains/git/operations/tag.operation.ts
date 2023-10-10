/**
 * @file Operations - TagOperation
 * @module grease/git/operations/TagOperation
 */

import { IsBoolable } from '#src/decorators'
import { GitOptions } from '#src/git/options'
import {
  DOT,
  defaults,
  ifelse,
  isFalsy,
  isUndefined,
  trim,
  type Assign
} from '@flex-development/tutils'
import { IsBoolean, IsNotIn, IsString, MinLength } from 'class-validator'

/**
 * Tag operation payload transfer object.
 */
type TagOperationDTO = Assign<
  Partial<TagOperation>,
  Pick<TagOperation, 'tag'>
>

/**
 * Git tag operation.
 *
 * @see {@linkcode GitOptions}
 * @see https://git-scm.com/docs/git-tag
 *
 * @class
 * @extends {GitOptions}
 */
class TagOperation extends GitOptions {
  /**
   * Replace an existing tag instead of failing.
   *
   * @default false
   *
   * @public
   * @instance
   * @member {boolean} force
   */
  @IsBoolean()
  public force: boolean

  /**
   * Tag message.
   *
   * @default ''
   *
   * @public
   * @instance
   * @member {string} message
   */
  @IsString()
  public message: string

  /**
   * Object the new tag will refer to.
   *
   * @default 'HEAD'
   *
   * @public
   * @instance
   * @member {string} object
   */
  @IsString()
  @MinLength(1)
  public object: string

  /**
   * Push tag to {@linkcode remote} after successful creation.
   *
   * @default false
   *
   * @public
   * @instance
   * @member {boolean} push
   */
  @IsBoolean()
  public push: boolean

  /**
   * Destination of the {@linkcode push} operation.
   *
   * This value may be the name of a remote, or a git-compliant URL.
   *
   * @see https://git-scm.com/docs/git-push#REMOTES
   * @see https://git-scm.com/docs/git-push#URLS
   *
   * @default 'origin'
   *
   * @public
   * @instance
   * @member {string} remote
   */
  @IsString()
  @MinLength(1)
  public remote: string

  /**
   * Create a GPG-signed tag, using the default e-mail address' key if `true`,
   * or the given key if a string.
   *
   * @default false
   *
   * @public
   * @instance
   * @member {boolean | string} sign
   */
  @IsString()
  @MinLength(1)
  @IsBoolable()
  public sign: boolean | string

  /**
   * Name of tag to create.
   *
   * The name must pass all checks defined by [`git-check-ref-format`][1]. Some
   * checks may restrict the characters allowed in a tag name.
   *
   * [1]: https://git-scm.com/docs/git-check-ref-format
   *
   * @public
   * @instance
   * @member {string} tag
   */
  @IsString()
  @MinLength(1)
  @IsNotIn(['@', '?', '['])
  public tag: string

  /**
   * Verify GPG signature of the new tag.
   *
   * @default !isFalsy(sign)
   *
   * @public
   * @instance
   * @member {boolean} verify
   */
  @IsBoolean()
  public verify: boolean

  /**
   * Create a new tag operation.
   *
   * @see {@linkcode TagOperationDTO}
   *
   * @param {TagOperationDTO} payload - Operation payload
   */
  constructor(payload: TagOperationDTO) {
    super(payload)

    const {
      force,
      message,
      object,
      push,
      remote,
      sign,
      tag,
      verify
    } = defaults(payload, {
      force: false,
      message: '',
      object: 'HEAD',
      push: false,
      remote: 'origin',
      sign: false,
      tag: '',
      verify: false
    })

    this.force = force
    this.message = message
    this.object = object
    this.push = push
    this.remote = trim(remote)
    this.sign = JSON.parse(JSON.stringify(sign))
    this.tag = ifelse(trim(tag), this.tagprefix + tag, DOT)
    this.verify = verify

    isUndefined(payload.verify) && !isFalsy(this.sign) && (this.verify = true)
  }
}

export { TagOperation as default, type TagOperationDTO }
