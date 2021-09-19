import defaults from '@grease/config/defaults.config'
import type { IGreaseOptions } from '@grease/interfaces'
import OPTIONS from '@grease/tests/fixtures/options.fixture'
import merge from 'lodash.merge'
import testSubject from '../get-options.util'

/**
 * @file Functional Tests - getOptions
 * @module grease/utils/tests/functional/getOptions
 */

const mockMerge = merge as jest.MockedFunction<typeof merge>

describe('functional:utils/getOptions', () => {
  let options: IGreaseOptions = {}

  beforeEach(() => {
    options = testSubject(OPTIONS)
  })

  it('should merge user options with defaults', () => {
    // Arrange
    const types = { types: expect.any(Array) }

    // Expect
    expect(mockMerge).toBeCalledTimes(1)
    expect(mockMerge.mock.calls[0][1]).toMatchObject(defaults)
    expect(mockMerge.mock.calls[0][2]).toMatchObject(OPTIONS)
    expect(mockMerge.mock.calls[0][3]).toMatchObject(types)
  })

  describe('IGreaseOptions.types', () => {
    it('should override hidden property', () => {
      options.types?.forEach(type => expect(type.hidden).toBeBoolean())
    })

    it('should hide unsectioned commits', () => {
      // Arrange
      const unsectioned = OPTIONS.types?.filter(t => t.section === undefined)

      // Expect
      unsectioned?.forEach(type => expect(type.hidden).toBeTrue())
    })
  })
})
