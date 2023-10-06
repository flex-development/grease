/**
 * @file Functional Tests - IsBoolable
 * @module grease/decorators/tests/functional/IsBoolable
 */

import { IsString, validate } from 'class-validator'
import TestSubject from '../is-boolable.decorator'

describe('functional:decorators/IsBoolable', () => {
  it('should ignore property validators if value is a boolean', async () => {
    // Arrange
    class Model {
      @IsString()
      @TestSubject()
      public readonly $property: boolean | string = true
    }

    // Act + Expect
    expect(await validate(new Model())).to.be.an('array').that.is.empty
  })
})
