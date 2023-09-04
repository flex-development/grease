/**
 * @file Functional Tests - IsNilable
 * @module grease/decorators/tests/functional/IsNilable
 */

import type { Nullable } from '@flex-development/tutils'
import { IsString, validate } from 'class-validator'
import TestSubject from '../is-nilable.decorator'

describe('functional:decorators/IsNilable', () => {
  it('should ignore property validators if value is null', async () => {
    // Arrange
    class Model {
      @IsString()
      @TestSubject()
      public $property: Nullable<string> = null
    }

    // Act + Expect
    expect(await validate(new Model())).to.be.an('array').that.is.empty
  })

  it('should ignore property validators if value is undefined', async () => {
    // Arrange
    class Model {
      @IsString()
      @TestSubject()
      public $property: string | undefined = undefined
    }

    // Act + Expect
    expect(await validate(new Model())).to.be.an('array').that.is.empty
  })
})
