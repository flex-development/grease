import { TVO_DEFAULTS } from '@grease/config/constants.config'
import type { TestcaseCalled } from '@tests/utils/types'
import { classToPlain } from 'class-transformer'
import type { TransformValidationOptions } from 'class-transformer-validator'
import { transformAndValidate } from 'class-transformer-validator'
import { IsString } from 'class-validator'
import merge from 'lodash/merge'
import { mocked } from 'ts-jest/utils'
import testSubject from '../validate.util'

/**
 * @file Functional Tests - validate
 * @module grease/utils/tests/functional/validate
 */

jest.mock('class-transformer')
jest.mock('class-transformer-validator')

const mockClassToPlain = mocked(classToPlain)
const mockMerge = merge as jest.MockedFunction<typeof merge>
const mockTransformAndValidate = mocked(transformAndValidate)

describe('functional:utils/validate', () => {
  class Model {
    @IsString()
    $property: string
  }

  const value: Model = { $property: 'string' }

  it('should perform async validation', async () => {
    // Arrange
    const options: TransformValidationOptions = { validator: { groups: [] } }

    // Act
    await testSubject(Model, value, true, options)

    // Expect
    expect(mockMerge).toBeCalledTimes(1)
    expect(mockMerge).toBeCalledWith(TVO_DEFAULTS, options)
    expect(mockTransformAndValidate).toBeCalledTimes(1)
    expect(mockTransformAndValidate.mock.calls[0][0]).toBe(Model)
    expect(mockTransformAndValidate.mock.calls[0][1]).toBe(value)
  })

  describe('args.plain', () => {
    type Case = TestcaseCalled & { plain: boolean | undefined }

    const cases: Case[] = [
      { call: 'call', expected: 1, plain: undefined },
      { call: 'call', expected: 1, plain: true },
      { call: 'not call', expected: 0, plain: false }
    ]

    const name = 'should $call classToPlain if plain === $plain'

    it.each<Case>(cases)(name, async testcase => {
      // Arrange
      const { expected, plain } = testcase

      // Act
      await testSubject(Model, value, plain)

      // Expect
      expect(mockClassToPlain).toBeCalledTimes(expected)
    })
  })
})
