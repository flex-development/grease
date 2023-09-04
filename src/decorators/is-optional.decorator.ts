/**
 * @file Decorators - IsOptional
 * @module grease/decorators/IsOptional
 */

import {
  cast,
  isUndefined,
  type DecoratorTarget,
  type Objectify,
  type OwnPropertyKey,
  type PropertyDecorator
} from '@flex-development/tutils'
import {
  ValidationTypes,
  getMetadataStorage,
  type ValidationOptions
} from 'class-validator'
import {
  ValidationMetadata
} from 'class-validator/esm2015/metadata/ValidationMetadata'

/**
 * Ignore all validators if a property value is `undefined`.
 *
 * @decorator
 *
 * @param {ValidationOptions} [options] - Validation options
 * @return {PropertyDecorator} Property decorator
 */
const IsOptional = (options: ValidationOptions = {}): PropertyDecorator => {
  return (target: DecoratorTarget, name: OwnPropertyKey): void => {
    getMetadataStorage().addValidationMetadata(
      new ValidationMetadata({
        constraints: [(obj: Objectify<any>) => !isUndefined(obj[name])],
        propertyName: cast(name),
        target: target.constructor,
        type: ValidationTypes.CONDITIONAL_VALIDATION,
        validationOptions: options
      })
    )
  }
}

export default IsOptional
