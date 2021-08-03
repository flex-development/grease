import { IsBranchMessage as Msg } from '@grease/enums/is-branch-message.enum'
import BRANCHES from '@tests/fixtures/git-branches.fixture'
import type {
  IsBranchOption as Option,
  Testcase,
  TestcaseDecorator
} from '@tests/utils/types'
import type { ValidationArguments } from 'class-validator'
import TestSubject from '../is-branch.constraint'

/**
 * @file Unit Tests - IsBranchConstraint
 * @module grease/constraints/tests/unit/IsBranch
 */

describe('unit:grease/constraints/IsBranchConstraint', () => {
  const CONSTRAINT = TestSubject.options?.name as string
  const Subject = new TestSubject()

  const REMOTE = 'origin'

  describe('#defaultMessage', () => {
    type Case = Testcase<keyof typeof Msg> & {
      args: Partial<ValidationArguments>
    }

    const cases: Case[] = [
      {
        args: {
          constraints: [
            {
              context: { [CONSTRAINT]: { error: { code: 'LOCAL' } } }
            }
          ],
          value: BRANCHES[404][0]
        },
        expected: 'LOCAL'
      },
      {
        args: {
          constraints: [
            {
              context: { [CONSTRAINT]: { error: { code: 'REMOTE' } } },
              each: true,
              remote: REMOTE
            }
          ],
          value: BRANCHES[404]
        },
        expected: 'REMOTE'
      }
    ]

    const name = 'should return message matching IsBranchMessage.$expected'

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

    const cases: Case[] = [
      {
        args: {
          constraints: [{}],
          value: BRANCHES[404][1]
        },
        expected: false,
        option: 'no options',
        value: BRANCHES[404][1]
      },
      {
        args: {
          constraints: [{ remote: REMOTE }],
          value: BRANCHES.remote[1]
        },
        expected: true,
        option: 'options.remote',
        value: BRANCHES.remote[1]
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
