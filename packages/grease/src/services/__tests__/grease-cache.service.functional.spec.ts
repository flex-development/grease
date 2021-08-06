import type { IGreaseOptions } from '@grease/interfaces'
import validate from '@grease/utils/validate.util'
import { TAGS_OPTIONS_LERNA } from '@tests/fixtures/git-tags.fixture'
import { mocked } from 'ts-jest/utils'
import TestSubject from '../grease-cache.service'

/**
 * @file Functional Tests - GreaseCache
 * @module grease/services/tests/functional/GreaseCache
 */

jest.mock('@grease/utils/validate.util')

const mockValidate = mocked(validate)

describe('functional:services/GreaseCache', () => {
  const Subject = new TestSubject()

  const options: IGreaseOptions = {
    lernaPackage: TAGS_OPTIONS_LERNA.package,
    tagPrefix: TAGS_OPTIONS_LERNA.tagPrefix,
    skipUnstable: TAGS_OPTIONS_LERNA.skipUnstable
  }

  describe('#init', () => {
    beforeEach(async () => {
      await Subject.init(options)
    })

    it('should call validate utility', () => {
      expect(mockValidate).toBeCalledTimes(1)
    })
  })
})
