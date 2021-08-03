import type { OneOrMany } from '@flex-development/tutils'
import Validator from '@grease/constraints/is-target-branch.constraint'
import { IsTargetBranchMessage as Msg } from '@grease/enums'
import type { IsTargetBranchOptions } from '@grease/interfaces'
import BRANCHES from '@tests/fixtures/git-branches.fixture'
import COMMITS from '@tests/fixtures/git-commit-shas.fixture'
import type {
  IsTargetBranchOption as Option,
  TestcaseDecorator
} from '@tests/utils/types'
import { validate, ValidateBy } from 'class-validator'
import TestSubject from '../is-target-branch.decorator'

/**
 * @file Functional Tests - IsTargetBranch
 * @module grease/decorators/tests/functional/IsTargetBranch
 */

const MockValidateBy = ValidateBy as jest.MockedFunction<typeof ValidateBy>

describe('functional:grease/decorators/IsTargetBranch', () => {
  const remote: IsTargetBranchOptions['remote'] = 'origin'

  describe('decorator logic', () => {
    const options: IsTargetBranchOptions = { remote, sha: true }

    it('should create property decorator', () => {
      // Act
      TestSubject(options)

      // Expect
      expect(MockValidateBy).toBeCalledTimes(1)
    })

    it('should push options into constraints array', () => {
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
    type Case = TestcaseDecorator<number, Option> & {
      options?: IsTargetBranchOptions
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
          value: 'branch'
        },
        {
          code: 'DOES_NOT_EXIST',
          expected: EXPECTED,
          option: 'options.remote',
          options: { each: true, remote },
          value: BRANCHES[404]
        },
        {
          code: 'DOES_NOT_EXIST',
          expected: EXPECTED,
          option: 'options.sha',
          options: { sha: true },
          value: 'commit'
        }
      ]

      const name = 'should fail given $value and $option'

      it.each<CaseFail>(cases)(name, async testcase => {
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
          value: BRANCHES.remote[BRANCHES.remote.length - 1]
        },
        {
          expected: EXPECTED,
          option: 'options.remote',
          options: { each: true, remote },
          value: BRANCHES.remote.slice(0, 2)
        },
        {
          expected: EXPECTED,
          option: 'options.sha',
          options: { each: true, sha: true },
          value: COMMITS.slice(0, 2)
        }
      ]

      const name = 'should pass given $value and $option'

      it.each<CasePass>(cases)(name, async testcase => {
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
