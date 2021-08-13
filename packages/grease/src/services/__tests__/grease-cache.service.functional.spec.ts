import validate from '@grease/utils/validate.util'
import { TAGS_OPTIONS_LERNA } from '@tests/fixtures/git-tags.fixture'
import TestSubject from '../grease-cache.service'

/**
 * @file Functional Tests - GreaseCache
 * @module grease/services/tests/functional/GreaseCache
 */

jest.mock('@grease/config/cache.config')
jest.mock('@grease/utils/validate.util')

const mockValidate = validate as jest.MockedFunction<typeof validate>

describe('functional:services/GreaseCache', () => {
  const Subject = new TestSubject()

  describe('#setOptions', () => {
    beforeEach(async () => {
      await Subject.setOptions({
        lernaPackage: TAGS_OPTIONS_LERNA.package,
        skipUnstable: TAGS_OPTIONS_LERNA.skipUnstable,
        tagPrefix: TAGS_OPTIONS_LERNA.tagPrefix
      })
    })

    it('should call validate utility', () => {
      expect(mockValidate).toBeCalledTimes(1)
    })
  })
})
