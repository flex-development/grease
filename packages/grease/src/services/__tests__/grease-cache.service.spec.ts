import type { IGreaseOptions } from '@grease/interfaces'
import { TAGS_OPTIONS_LERNA } from '@grease/tests/fixtures/git-tags.fixture'
import type { GitSemverTagsOptions } from '@grease/types'
import type { Testcase } from '@tests/utils/types'
import TestSubject from '../grease-cache.service'

/**
 * @file Unit Tests - GreaseCache
 * @module grease/services/tests/unit/GreaseCache
 */

jest.mock('@grease/config/cache.config')

describe('unit:services/GreaseCache', () => {
  const Subject = new TestSubject()

  const options: IGreaseOptions = {
    lernaPackage: TAGS_OPTIONS_LERNA.package,
    skipUnstable: TAGS_OPTIONS_LERNA.skipUnstable,
    tagPrefix: TAGS_OPTIONS_LERNA.tagPrefix
  }

  describe('get git', () => {
    type Case = Testcase<GitSemverTagsOptions> & {
      options: IGreaseOptions
      state: 'empty' | 'non-empty'
    }

    const cases: Case[] = [
      { expected: {}, options: {}, state: 'empty' },
      { expected: TAGS_OPTIONS_LERNA, options, state: 'non-empty' }
    ]

    const name = 'should return $expected if #options is $state object'

    it.each<Case>(cases)(name, testcase => {
      // Arrange
      Subject.options = testcase.options

      // Act + Expect
      expect(Subject.git).toMatchObject(testcase.expected)
    })
  })
})
