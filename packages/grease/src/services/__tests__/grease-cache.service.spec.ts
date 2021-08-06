import type { IGreaseOptions } from '@grease/interfaces'
import type { GitSemverTagsOptions } from '@grease/types'
import validate from '@grease/utils/validate.util'
import { TAGS_OPTIONS_LERNA } from '@tests/fixtures/git-tags.fixture'
import type { Testcase } from '@tests/utils/types'
import { mocked } from 'ts-jest/utils'
import TestSubject from '../grease-cache.service'

/**
 * @file Unit Tests - GreaseCache
 * @module grease/services/tests/unit/GreaseCache
 */

jest.mock('@grease/utils/validate.util')

const mockValidate = mocked(validate)

describe('unit:services/GreaseCache', () => {
  const Subject = new TestSubject()

  const options: IGreaseOptions = {
    lernaPackage: TAGS_OPTIONS_LERNA.package,
    tagPrefix: TAGS_OPTIONS_LERNA.tagPrefix,
    skipUnstable: TAGS_OPTIONS_LERNA.skipUnstable
  }

  describe('get git', () => {
    type Case = Testcase<GitSemverTagsOptions> & {
      options: IGreaseOptions
      ready: boolean
    }

    const cases: Case[] = [
      { expected: {}, options: {}, ready: false },
      { expected: TAGS_OPTIONS_LERNA, options: options, ready: true }
    ]

    const name = 'should return $expected if ready === $ready'

    it.each<Case>(cases)(name, testcase => {
      // Arrange
      Subject.options = testcase.options
      Subject.ready = testcase.ready

      // Act + Expect
      expect(Subject.git).toMatchObject(testcase.expected)
    })
  })

  describe('#init', () => {
    it('should return application options', async () => {
      // Arrange
      mockValidate.mockImplementationOnce(async (Model, value) => value)

      // Act + Expect
      expect(await Subject.init(options)).toMatchObject(options)
    })
  })
})
