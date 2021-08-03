import { IsTargetBranchMessage as Msg } from '@grease/enums'
import BRANCHES from '@tests/fixtures/git-branches.fixture'
import COMMITS from '@tests/fixtures/git-commit-shas.fixture'
import type {
  IsTargetBranchOption as Option,
  Testcase,
  TestcaseDecorator
} from '@tests/utils/types'
import type { ValidationArguments } from 'class-validator'
import faker from 'faker'
import TestSubject from '../is-target-branch.constraint'

/**
 * @file Unit Tests - IsTargetBranchConstraint
 * @module grease/constraints/tests/unit/IsTargetBranch
 */

describe('unit:grease/constraints/IsTargetBranchConstraint', () => {
  const CONSTRAINT = TestSubject.options?.name as string
  const Subject = new TestSubject()

  describe('#defaultMessage', () => {
    type Case = Testcase<keyof typeof Msg> & {
      args: Partial<ValidationArguments>
    }

    const context = { [CONSTRAINT]: { error: { code: 'DOES_NOT_EXIST' } } }

    const cases: Case[] = [
      {
        args: {
          constraints: [{ context, sha: true }],
          value: faker.git.commitSha()
        },
        expected: 'DOES_NOT_EXIST'
      },
      {
        args: {
          constraints: [{ context, each: true }],
          value: BRANCHES[404]
        },
        expected: 'DOES_NOT_EXIST'
      }
    ]

    const estring = `IsTargetBranch.$expected`
    const name = `should return message matching ${estring} given $args.value`

    it.each<Case>(cases)(name, testcase => {
      // Arrange
      const { args, expected } = testcase

      // Act
      const result = Subject.defaultMessage(args as ValidationArguments)

      // Expect
      expect(result).toMatch(Msg[expected])
    })
  })

  describe('#validate', () => {
    type Case = TestcaseDecorator<boolean, Option> & {
      args: Partial<ValidationArguments>
      value: any
    }

    const commit = 'commit'

    const cases: Case[] = [
      {
        args: { constraints: [{}], value: BRANCHES[404][0] },
        expected: false,
        option: 'no options',
        value: BRANCHES[404][0]
      },
      {
        args: { constraints: [{ remote: 'prod' }], value: commit },
        expected: false,
        option: 'options.remote',
        value: commit
      },
      {
        args: { constraints: [{ sha: true }], value: commit },
        expected: false,
        option: 'options.sha',
        value: commit
      },
      {
        args: { constraints: [{}], value: BRANCHES.remote[0] },
        expected: true,
        option: 'no options',
        value: BRANCHES.remote[0]
      },
      {
        args: {
          constraints: [{ remote: 'origin' }],
          value: BRANCHES.remote[1]
        },
        expected: true,
        option: 'options.remote',
        value: BRANCHES.remote[1]
      },
      {
        args: { constraints: [{ sha: true }], value: COMMITS[0] },
        expected: true,
        option: 'options.sha',
        value: COMMITS[0]
      }
    ]

    const name = 'should return $expected given $value and $option'

    it.each<Case>(cases)(name, async testcase => {
      // Arrange
      const { args, expected, value } = testcase

      // Act
      const result = await Subject.validate(value, args as ValidationArguments)

      // Expect
      expect(result).toBe(expected)
    })
  })
})
