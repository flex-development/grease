import type { OneOrMany } from '@flex-development/tutils'
import Validator from '@grease/constraints/is-target-branch.constraint'
import { IsTargetBranchMessage as Msg } from '@grease/enums'
import type { IsTargetBranchOptions } from '@grease/interfaces'
import BRANCHES from '@tests/fixtures/git-branches.fixture'
import COMMITS from '@tests/fixtures/git-commit-shas.fixture'
import type { Testcase } from '@tests/utils/types'
import { validate, ValidateBy } from 'class-validator'
import faker from 'faker'
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
    type Case = Testcase<number> & { options?: IsTargetBranchOptions }

    describe('fails', () => {
      type CaseFail = Case & {
        code: keyof typeof Msg
        value: OneOrMany<any>
      }

      const CONSTRAINT = Validator.options?.name as string
      const EXPECTED = 1

      const cases: CaseFail[] = [
        { code: 'DOES_NOT_EXIST', expected: EXPECTED, value: 'branch' },
        {
          code: 'DOES_NOT_EXIST',
          expected: EXPECTED,
          options: { each: true, remote },
          value: BRANCHES[404]
        },
        {
          code: 'DOES_NOT_EXIST',
          expected: EXPECTED,
          options: { sha: true },
          value: 'commit'
        },
        {
          code: 'DOES_NOT_EXIST',
          expected: EXPECTED,
          options: { each: true, sha: true },
          value: [faker.git.commitSha(), faker.git.commitSha()]
        }
      ]

      const name = 'should fail given $value'

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
      type CaseSuccess = Case & { value: OneOrMany<Property> }

      const EXPECTED = 0

      const cases: CaseSuccess[] = [
        {
          expected: EXPECTED,
          value: BRANCHES.remote[BRANCHES.remote.length - 1]
        },
        {
          expected: EXPECTED,
          options: { each: true, remote },
          value: BRANCHES.remote.slice(0, 2)
        },
        {
          expected: EXPECTED,
          options: { sha: true },
          value: COMMITS[COMMITS.length - 1]
        },
        {
          expected: EXPECTED,
          options: { each: true, sha: true },
          value: COMMITS.slice(0, 2)
        }
      ]

      const name = 'should pass given $value'

      it.each<CaseSuccess>(cases)(name, async testcase => {
        // Arrange
        const { expected, options, value } = testcase

        class TestClass {
          @TestSubject(options)
          $property: CaseSuccess['value']

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
