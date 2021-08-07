import type { IGreaseOptions } from '@grease/interfaces'
import validateSync from '@grease/utils/validate-sync.util'
import { TAGS_OPTIONS_LERNA } from '@tests/fixtures/git-tags.fixture'
import TestSubject from '../grease-cache.service'

/**
 * @file Functional Tests - GreaseCache
 * @module grease/services/tests/functional/GreaseCache
 */

jest.mock('@grease/utils/validate-sync.util')

const mockValidateSync = validateSync as jest.MockedFunction<
  typeof validateSync
>

describe('functional:services/GreaseCache', () => {
  const Subject = new TestSubject()

  const args: IGreaseOptions = {
    lernaPackage: TAGS_OPTIONS_LERNA.package,
    tagPrefix: TAGS_OPTIONS_LERNA.tagPrefix,
    skipUnstable: TAGS_OPTIONS_LERNA.skipUnstable
  }

  describe('set args', () => {
    beforeEach(() => {
      Subject.args = args
    })

    it('should call validateSync utility', () => {
      expect(mockValidateSync).toBeCalledTimes(1)
    })
  })
})
