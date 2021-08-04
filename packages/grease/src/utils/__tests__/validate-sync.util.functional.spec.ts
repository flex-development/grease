import { TVO_DEFAULTS } from '@grease/config/constants.config'
import type { TestcaseCalled } from '@tests/utils/types'
import { classToPlain } from 'class-transformer'
import type { TransformValidationOptions } from 'class-transformer-validator'
import { transformAndValidateSync } from 'class-transformer-validator'
import { IsString } from 'class-validator'
import merge from 'lodash/merge'
import { mocked } from 'ts-jest/utils'
import testSubject from '../validate-sync.util'

/**
 * @file Functional Tests - validateSync
 * @module grease/utils/tests/functional/validateSync
 */

jest.mock('class-transformer')
jest.mock('class-transformer-validator')

const mockClassToPlain = mocked(classToPlain)
const mockMerge = merge as jest.MockedFunction<typeof merge>
const mockTransformAndValidateSync = mocked(transformAndValidateSync)

describe('functional:utils/validateSync', () => {
  class Model {
    @IsString()
    $property: string
  }

  const value: Model = { $property: 'string' }

  it('should perform synchronous validation', () => {
    // Arrange
    const options: TransformValidationOptions = { validator: { groups: [] } }

    // Act
    testSubject(Model, value, true, options)

    // Expect
    expect(mockMerge).toBeCalledTimes(1)
    expect(mockMerge).toBeCalledWith(TVO_DEFAULTS, options)
    expect(mockTransformAndValidateSync).toBeCalledTimes(1)
    expect(mockTransformAndValidateSync.mock.calls[0][0]).toBe(Model)
    expect(mockTransformAndValidateSync.mock.calls[0][1]).toBe(value)
  })

  describe('args.plain', () => {
    type Case = TestcaseCalled & { plain: boolean | undefined }

    const cases: Case[] = [
      { call: 'call', expected: 1, plain: undefined },
      { call: 'call', expected: 1, plain: true },
      { call: 'not call', expected: 0, plain: false }
    ]

    const name = 'should $call classToPlain if plain === $plain'

    it.each<Case>(cases)(name, testcase => {
      // Arrange
      const { expected, plain } = testcase

      // Act
      testSubject(Model, value, plain)

      // Expect
      expect(mockClassToPlain).toBeCalledTimes(expected)
    })
  })
})
