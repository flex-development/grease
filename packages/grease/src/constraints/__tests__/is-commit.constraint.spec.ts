import { IsCommitMessage as Msg } from '@grease/enums/is-commit-message.enum'
import COMMITS from '@tests/fixtures/git-commit-shas.fixture'
import type { Testcase } from '@tests/utils/types'
import type { ValidationArguments } from 'class-validator'
import TestSubject from '../is-commit.constraint'

/**
 * @file Unit Tests - IsCommitConstraint
 * @module grease/constraints/tests/unit/IsCommit
 */

describe('unit:constraints/IsCommitConstraint', () => {
  const Subject = new TestSubject()

  const value = 'commit'
  const args = { constraints: [{}], value }

  describe('#defaultMessage', () => {
    type Case = Testcase<keyof typeof Msg> & {
      args: Partial<ValidationArguments>
    }

    const cases: Case[] = [{ args, expected: 'DOES_NOT_EXIST' }]

    const name = 'should return message matching IsCommitMessage.$expected'

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
    type Case = Testcase<boolean> & {
      args: Partial<ValidationArguments>
      option: 'no options'
      value: any
    }

    const cases: Case[] = [
      {
        args,
        expected: false,
        option: 'no options',
        value
      },
      {
        args: { constraints: [{}], value: COMMITS[0] },
        expected: true,
        option: 'no options',
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
