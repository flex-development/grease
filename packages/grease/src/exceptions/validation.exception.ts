import { ExceptionStatusCode as Code } from '@flex-development/exceptions/enums'
import Exception from '@flex-development/exceptions/exceptions/base.exception'
import type { ObjectPlain } from '@flex-development/tutils'
import { classToPlain } from 'class-transformer'
import { ValidationError } from 'class-validator'

/**
 * @file Exceptions - ValidationException
 * @module grease/exceptions/ValidationException
 */

/**
 * Transforms [validation errors][1] and `Error` objects into [`Exception`][2]
 * class objects.
 *
 * [1]: https://github.com/typestack/class-validator#validation-errors
 * [2]: https://github.com/flex-development/exceptions
 *
 * @class
 * @extends Exception
 */
export default class ValidationException extends Exception {
  /**
   * @readonly
   * @instance
   * @property {string} model - Data model name
   */
  readonly model: string

  /**
   * @instance
   * @property {ValidationError[]} errors - Validation errors (plain objects)
   */
  errors: ValidationError[]

  /**
   * Transforms a `ValidationError[]` or `Error` into an `Exception`.
   *
   * @param {string} model - Data model name
   * @param {Error | ValidationError[]} [error] - Error to transform
   * @param {ObjectPlain} [data] - Additional error data
   */
  constructor(
    model: string,
    error: Error | ValidationError[] = [],
    data: ObjectPlain = {}
  ) {
    super(Code.BAD_REQUEST, '', data, (error as Error)?.stack)

    this.model = model

    if (Array.isArray(error)) {
      this.errors = (classToPlain(error) || []) as ValidationError[]
      this.message = `${model} validation failure`

      if (this.errors.length) {
        const props = (this.errors as ValidationError[]).map(e => e.property)
        this.message += `: [${props}]`
      }
    } else {
      this.errors = []
      this.message = error.message
    }
  }
}
