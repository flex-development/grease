import type { IGreaseOptions } from '@grease/interfaces'
import GreaseOptions from '@grease/models/grease-options.model'
import validate from '@grease/utils/validate.util'
import { TAGS_OPTIONS_LERNA } from '@tests/fixtures/git-tags.fixture'
import testSubject from '../cache-options.util'

/**
 * @file Functional Tests - cacheOptions
 * @module grease/utils/tests/functional/cacheOptions
 */

jest.mock('@grease/utils/validate.util')

const mockValidate = validate as jest.MockedFunction<typeof validate>

describe('functional:utils/cacheOptions', () => {
  const options: IGreaseOptions = {
    lernaPackage: TAGS_OPTIONS_LERNA.package,
    skipUnstable: TAGS_OPTIONS_LERNA.skipUnstable,
    tagPrefix: TAGS_OPTIONS_LERNA.tagPrefix
  }

  beforeEach(async () => {
    await testSubject(options)
  })

  it('should validate application options', () => {
    expect(mockValidate).toBeCalledTimes(1)
    expect(mockValidate).toBeCalledWith(GreaseOptions, options)
  })
})
