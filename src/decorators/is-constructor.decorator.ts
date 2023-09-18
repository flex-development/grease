/**
 * @file Decorators - IsConstructor
 * @module grease/decorators/IsConstructor
 */

import type { PropertyDecorator } from '@flex-development/tutils'
import { ValidateBy, type ValidationOptions } from 'class-validator'
import validator from './is-constructor.constraint'

/**
 * Check if a property value is a constructor.
 *
 * @decorator
 *
 * @param {ValidationOptions} [options] - Validation options
 * @return {PropertyDecorator} Property decorator
 */
const IsConstructor = (options: ValidationOptions = {}): PropertyDecorator => {
  return ValidateBy({
    async: validator.options.async,
    constraints: [options],
    name: validator.options.name,
    validator
  }, options)
}

export default IsConstructor
