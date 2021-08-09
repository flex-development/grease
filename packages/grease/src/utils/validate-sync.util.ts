import type { ObjectPlain } from '@flex-development/tutils'
import { TVO_DEFAULTS } from '@grease/config/constants.config'
import ValidationException from '@grease/exceptions/validation.exception'
import { classToPlain } from 'class-transformer'
import type {
  ClassType,
  TransformValidationOptions
} from 'class-transformer-validator'
import { transformAndValidateSync } from 'class-transformer-validator'
import merge from 'lodash/merge'

/**
 * @file Utility - validateSync
 * @module grease/utils/validateSync
 */

/**
 * Synchronously transforms `value` into a `Model` class object and validates
 * the new class object.
 *
 * If validation succeeds, the new class object will be converted back into
 * a plain object before being returned, unless `plain` is set to `false`.
 *
 * Uses [`class-transformer-validator`][1] under the hood.
 *
 * @template T - Schema model type
 *
 * [1]: https://github.com/MichalLytek/class-transformer-validator
 *
 * @param {ClassType<T>} Model - Schema model
 * @param {any} value - Value to validate against `Model`
 * @param {boolean} [plain] - Convert back into plain object after validating
 * @param {TransformValidationOptions} [options] - Validation options
 * @param {ObjectPlain} [data] - Additional data if error occurs
 * @return {T} Class or plain object
 * @throws {ValidationException}
 */
function validateSync<T extends ObjectPlain = ObjectPlain>(
  Model: ClassType<T>,
  value: any,
  plain: boolean = true,
  options: TransformValidationOptions = {},
  data: ObjectPlain = {}
): T {
  options = merge({ ...TVO_DEFAULTS }, options)

  try {
    value = transformAndValidateSync(Model, value, options)
    if (plain) value = classToPlain(value, options.transformer)
  } catch (error) {
    const model = new Model().constructor.name

    throw new ValidationException(model, error, merge(data, { options }))
  }

  return value
}

export default validateSync
