/**
 * @file Decorators - IsReleaseVersion
 * @module grease/decorators/IsReleaseVersion
 */

import type { PropertyDecorator } from '@flex-development/tutils'
import { ValidateBy, type ValidationOptions } from 'class-validator'
import validator from './is-release-version.constraint'

/**
 * Check if a property value is a release type or semantic version.
 *
 * @decorator
 *
 * @param {ValidationOptions} [options] - Validation options
 * @return {PropertyDecorator} Property decorator
 */
const IsReleaseVersion = (
  options: ValidationOptions = {}
): PropertyDecorator => {
  return ValidateBy({
    async: validator.options.async,
    constraints: [options],
    name: validator.options.name,
    validator
  }, options)
}

export default IsReleaseVersion
