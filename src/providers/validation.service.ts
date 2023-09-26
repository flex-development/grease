/**
 * @file Providers - ValidationService
 * @module grease/providers/ValidationService
 */

import type { ValidatorOptions } from '#src/types'
import AggregateError from '@flex-development/aggregate-error-ponyfill'
import {
  defaults,
  join,
  select,
  template,
  type ObjectCurly
} from '@flex-development/tutils'
import { Injectable } from '@nestjs/common'
import { validate, type ValidationError } from 'class-validator'

/**
 * Validation provider.
 *
 * @class
 */
@Injectable()
class ValidationService {
  /**
   * Validate an instance object based on decorators used in the parent class.
   *
   * @see {@linkcode ValidatorOptions}
   *
   * @public
   * @async
   *
   * @template T - Instance object type
   *
   * @param {T} obj - Instance object to validate
   * @param {ValidatorOptions?} [opts] - Validation options
   * @return {Promise<T>} Validated instance object
   * @throws {AggregateError<ValidationError, T>}
   */
  public async validate<T extends ObjectCurly>(
    obj: T,
    opts: ValidatorOptions = {}
  ): Promise<T> {
    const { debug, target, value } = defaults(opts, {
      debug: false,
      target: false,
      value: true
    })

    /**
     * Validation errors.
     *
     * @const {ValidationError[]} errors
     */
    const errors: ValidationError[] = await validate(obj, {
      dismissDefaultMessages: false,
      enableDebugMessages: debug,
      forbidNonWhitelisted: false,
      forbidUnknownValues: false,
      skipMissingProperties: false,
      skipNullProperties: false,
      skipUndefinedProperties: false,
      stopAtFirstError: false,
      validationError: { target, value },
      whitelist: true
    })

    // throw aggregate validation error if validation failed
    if (errors.length) {
      /**
       * Validation error message.
       *
       * @const {string} msg
       */
      const msg: string = template('{model} validation failure: [{props}]', {
        model: obj.constructor.name,
        props: join(select(errors, null, e => e.property), ',')
      })

      throw new AggregateError(errors, msg, { cause: obj })
    }

    return obj
  }
}

export default ValidationService
