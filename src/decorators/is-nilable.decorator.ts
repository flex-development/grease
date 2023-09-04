/**
 * @file Decorators - IsNilable
 * @module grease/decorators/IsNilable
 */

import {
  cast,
  isNull,
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
 * Ignore all validators if a property value is `null` or `undefined`.
 *
 * @decorator
 *
 * @param {ValidationOptions} [options] - Validation options
 * @return {PropertyDecorator} Property decorator
 */
const IsNilable = (options: ValidationOptions = {}): PropertyDecorator => {
  return (target: DecoratorTarget, name: OwnPropertyKey): void => {
    getMetadataStorage().addValidationMetadata(
      new ValidationMetadata({
        constraints: [
          (obj: Objectify<any>) => !isNull(obj[name]) && !isUndefined(obj[name])
        ],
        propertyName: cast(name),
        target: target.constructor,
        type: ValidationTypes.CONDITIONAL_VALIDATION,
        validationOptions: options
      })
    )
  }
}

export default IsNilable
