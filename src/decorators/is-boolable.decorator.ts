/**
 * @file Decorators - IsBoolable
 * @module grease/decorators/IsBoolable
 */

import {
  cast,
  isBoolean,
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
 * Ignore all validators if a property value is a boolean.
 *
 * @decorator
 *
 * @param {ValidationOptions} [options] - Validation options
 * @return {PropertyDecorator} Property decorator
 */
const IsBoolable = (options: ValidationOptions = {}): PropertyDecorator => {
  return (target: DecoratorTarget, name: OwnPropertyKey): void => {
    getMetadataStorage().addValidationMetadata(
      new ValidationMetadata({
        constraints: [(obj: Objectify<any>) => !isBoolean(obj[name])],
        propertyName: cast(name),
        target: target.constructor,
        type: ValidationTypes.CONDITIONAL_VALIDATION,
        validationOptions: options
      })
    )
  }
}

export default IsBoolable
