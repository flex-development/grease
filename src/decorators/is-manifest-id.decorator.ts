/**
 * @file Decorators - IsManifestId
 * @module grease/decorators/IsManifestId
 */

import type { PropertyDecorator } from '@flex-development/tutils'
import { ValidateBy, type ValidationOptions } from 'class-validator'
import validator from './is-manifest-id.constraint'

/**
 * Check if a property value is a valid package manifest id.
 *
 * @decorator
 *
 * @param {ValidationOptions} [options] - Validation options
 * @return {PropertyDecorator} Property decorator
 */
const IsManifestId = (options: ValidationOptions = {}): PropertyDecorator => {
  return ValidateBy({
    async: validator.options.async,
    constraints: [options],
    name: validator.options.name,
    validator
  }, options)
}

export default IsManifestId
