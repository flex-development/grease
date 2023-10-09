/**
 * @file Operations - TagOperationHandler
 * @module grease/git/operations/TagOperationHandler
 */

import { GitService } from '#src/git/providers'
import { LoggerService, ValidationService } from '#src/providers'
import { ifelse, isBoolean, isString, template } from '@flex-development/tutils'
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs'
import TagOperation from './tag.operation'

/**
 * Tag operation handler.
 *
 * @see {@linkcode TagOperation}
 *
 * @class
 * @implements {ICommandHandler<TagOperation,TagOperation>}
 */
@CommandHandler(TagOperation)
class TagOperationHandler
  implements ICommandHandler<TagOperation, TagOperation> {
  /**
   * Create a new tag operation handler.
   *
   * @param {GitService} git - Git commands service
   * @param {LoggerService} logger - Logger service
   * @param {ValidationService} validator - Validation service
   */
  constructor(
    protected readonly git: GitService,
    protected readonly logger: LoggerService,
    protected readonly validator: ValidationService
  ) {
    this.logger = logger.withTag('tag')
  }

  /**
   * Execute a tag operation.
   *
   * @see {@linkcode TagOperation}
   *
   * @public
   * @async
   *
   * @param {TagOperation} operation - Operation to execute
   * @return {Promise<TagOperation>} Executed tag operation
   */
  public async execute(operation: TagOperation): Promise<TagOperation> {
    const {
      force,
      message,
      object,
      push,
      quiet,
      remote,
      sign,
      tag,
      tagprefix,
      verify
    } = await this.validator.validate(operation)

    // sync logger
    this.logger.sync({ quiet })

    // log tag creation start
    this.logger.start('creating tag', tag)

    // create tag object
    await this.git.tag([
      '--annotate',
      ifelse(force, '--force', ''),
      ifelse(isString(sign), template('--local-user={sign}', { sign }), ''),
      template('--message="{message}"', {
        message: template(message, {
          object,
          tag,
          tagprefix,
          tagraw: tag.replace(tagprefix, '')
        })
      }),
      ifelse(isBoolean(sign), ifelse(sign, '--sign', '--no-sign'), ''),
      tag,
      ifelse(object !== 'HEAD', object, '')
    ], operation)

    // log tag creation success
    this.logger.success('created tag', tag)

    // verify gpg signature
    if (verify) {
      this.logger.start('verifying gpg signature')

      /**
       * GPG signature verification output.
       *
       * @const {string} output
       */
      const output: string = await this.git.tag(['--verify', tag], operation)

      this.logger.success(output.replace(
        /(?<=\n)(^\b)/gm,
        ' '.repeat(this.logger.options.defaults.tag!.length + 5) + '$1'
      ))
    }

    // push tag
    if (push) {
      this.logger.start('pushing', tag)
      await this.git.push([ifelse(force, '-f', ''), remote, tag], operation)
      this.logger.success('pushed', tag, 'to', remote)
    }

    return operation
  }
}

export default TagOperationHandler
