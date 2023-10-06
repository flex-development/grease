/**
 * @file Decorators - IsFile
 * @module grease/decorators/IsFile
 */

import type { PropertyDecorator } from '@flex-development/tutils'
import { ValidateBy, type ValidationOptions } from 'class-validator'
import validator from './is-file.constraint'

/**
 * Check if a property value is a file path or url.
 *
 * @decorator
 *
 * @param {ValidationOptions} [options] - Validation options
 * @return {PropertyDecorator} Property decorator
 */
const IsFile = (options: ValidationOptions = {}): PropertyDecorator => {
  return ValidateBy({
    async: validator.options.async,
    constraints: [options],
    name: validator.options.name,
    validator
  }, options)
}

export default IsFile
