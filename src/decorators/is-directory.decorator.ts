/**
 * @file Decorators - IsDirectory
 * @module grease/decorators/IsDirectory
 */

import type { PropertyDecorator } from '@flex-development/tutils'
import { ValidateBy, type ValidationOptions } from 'class-validator'
import validator from './is-directory.constraint'

/**
 * Check if a property value is a directory path.
 *
 * @decorator
 *
 * @param {ValidationOptions} [options] - Validation options
 * @return {PropertyDecorator} Property decorator
 */
const IsDirectory = (options: ValidationOptions = {}): PropertyDecorator => {
  return ValidateBy({
    async: validator.options.async,
    constraints: [options],
    name: validator.options.name,
    validator
  }, options)
}

export default IsDirectory
