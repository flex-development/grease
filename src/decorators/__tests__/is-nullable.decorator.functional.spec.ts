/**
 * @file Functional Tests - IsNullable
 * @module grease/decorators/tests/functional/IsNullable
 */

import type { Nullable } from '@flex-development/tutils'
import { IsString, validate } from 'class-validator'
import TestSubject from '../is-nullable.decorator'

describe('functional:decorators/IsNullable', () => {
  it('should ignore property validators if value is null', async () => {
    // Arrange
    class Model {
      @IsString()
      @TestSubject()
      public readonly $property: Nullable<string> = null
    }

    // Act + Expect
    expect(await validate(new Model())).to.be.an('array').that.is.empty
  })
})
