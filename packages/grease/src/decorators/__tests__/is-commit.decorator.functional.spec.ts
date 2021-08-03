import type { OneOrMany } from '@flex-development/tutils'
import Validator from '@grease/constraints/is-commit.constraint'
import { IsCommitMessage as Msg } from '@grease/enums/is-commit-message.enum'
import COMMITS from '@tests/fixtures/git-commit-shas.fixture'
import type { TestcaseDecorator } from '@tests/utils/types'
import type { ValidationOptions } from 'class-validator'
import { validate, ValidateBy } from 'class-validator'
import faker from 'faker'
import TestSubject from '../is-commit.decorator'

/**
 * @file Functional Tests - IsCommit
 * @module grease/decorators/tests/functional/IsCommit
 */

const MockValidateBy = ValidateBy as jest.MockedFunction<typeof ValidateBy>

describe('functional:grease/decorators/IsCommit', () => {
  describe('decorator logic', () => {
    it('should create property decorator', () => {
      // Act
      TestSubject({})

      // Expect
      expect(MockValidateBy).toBeCalledTimes(1)
    })

    it('should push options into constraints array', () => {
      // Arrange
      const options = { each: true }

      // Act
      TestSubject(options)

      // Expect
      expect(MockValidateBy.mock.calls[0][0].constraints).toIncludeSameMembers([
        options
      ])
    })
  })

  describe('validation', () => {
    type Property = OneOrMany<string>
    type Case = TestcaseDecorator<number> & {
      options?: ValidationOptions
    }

    describe('fails', () => {
      type CaseFail = Case & {
        code: keyof typeof Msg
        value: OneOrMany<any>
      }

      const CONSTRAINT = Validator.options?.name as string
      const EXPECTED = 1

      const cases: CaseFail[] = [
        {
          code: 'DOES_NOT_EXIST',
          expected: EXPECTED,
          option: 'no options',
          options: { each: true },
          value: [faker.git.commitSha(), faker.git.commitSha()]
        }
      ]

      it.each<CaseFail>(cases)('should fail with $option', async testcase => {
        // Arrange
        const { code, expected, options, value } = testcase

        const message_regex = new RegExp(Msg[code].replace('$property', ''))

        class TestClass {
          @TestSubject(options)
          $property: CaseFail['value']

          constructor($property: TestClass['$property']) {
            this.$property = $property
          }
        }

        // Act
        const errors = await validate(new TestClass(value))

        //  Expect
        expect(errors).toBeArrayOfSize(expected)
        expect(errors[0].constraints?.[CONSTRAINT]).toMatch(message_regex)
      })
    })

    describe('passes', () => {
      type CasePass = Case & { value: OneOrMany<Property> }

      const EXPECTED = 0

      const cases: CasePass[] = [
        {
          expected: EXPECTED,
          option: 'no options',
          options: { each: true },
          value: COMMITS.slice(0, 2)
        }
      ]

      it.each<CasePass>(cases)('should pass with $option', async testcase => {
        // Arrange
        const { expected, options, value } = testcase

        class TestClass {
          @TestSubject(options)
          $property: CasePass['value']

          constructor($property: TestClass['$property']) {
            this.$property = $property
          }
        }

        // Act
        const errors = await validate(new TestClass(value))

        //  Expect
        expect(errors).toBeArrayOfSize(expected)
      })
    })
  })
})
