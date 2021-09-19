import GreaseOptions from '@grease/models/grease-options.model'
import OPTIONS from '@grease/tests/fixtures/options.fixture'
import validate from '@grease/utils/validate.util'
import testSubject from '../cache-options.util'

/**
 * @file Functional Tests - cacheOptions
 * @module grease/utils/tests/functional/cacheOptions
 */

jest.mock('@grease/utils/validate.util')

const mockValidate = validate as jest.MockedFunction<typeof validate>

describe('functional:utils/cacheOptions', () => {
  beforeEach(async () => {
    await testSubject(OPTIONS)
  })

  it('should validate application options', () => {
    expect(mockValidate).toBeCalledTimes(1)
    expect(mockValidate).toBeCalledWith(GreaseOptions, OPTIONS, false)
  })
})
