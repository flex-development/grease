/**
 * @file Decorators - IsNullable
 * @module grease/decorators/IsNullable
 */

import {
  cast,
  isNull,
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
 * Ignore all validators if a property value is `null`.
 *
 * @decorator
 *
 * @param {ValidationOptions} [options] - Validation options
 * @return {PropertyDecorator} Property decorator
 */
const IsNullable = (options: ValidationOptions = {}): PropertyDecorator => {
  return (target: DecoratorTarget, name: OwnPropertyKey): void => {
    getMetadataStorage().addValidationMetadata(
      new ValidationMetadata({
        constraints: [(obj: Objectify<any>) => !isNull(obj[name])],
        propertyName: cast(name),
        target: target.constructor,
        type: ValidationTypes.CONDITIONAL_VALIDATION,
        validationOptions: options
      })
    )
  }
}

export default IsNullable
