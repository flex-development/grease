/**
 * @file Functional Tests - IsOptional
 * @module grease/decorators/tests/functional/IsOptional
 */

import { IsString, validate } from 'class-validator'
import TestSubject from '../is-optional.decorator'

describe('functional:decorators/IsOptional', () => {
  it('should ignore property validators if value is undefined', async () => {
    // Arrange
    class Model {
      @IsString()
      @TestSubject()
      public readonly $property: string | undefined = undefined
    }

    // Act + Expect
    expect(await validate(new Model())).to.be.an('array').that.is.empty
  })
})
