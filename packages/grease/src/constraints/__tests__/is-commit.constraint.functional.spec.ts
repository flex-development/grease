import COMMITS from '@tests/fixtures/git-commit-shas.fixture'
import type { Testcase } from '@tests/utils/types'
import type { ValidationArguments } from 'class-validator'
import fs from 'fs'
import { readCommit } from 'isomorphic-git'
import TestSubject from '../is-commit.constraint'

/**
 * @file Functional Tests - IsCommitConstraint
 * @module grease/constraints/tests/functional/IsCommit
 */

const mockReadCommit = readCommit as jest.MockedFunction<typeof readCommit>

describe('functional:constraints/IsCommitConstraint', () => {
  const Subject = new TestSubject()

  describe('#validate', () => {
    it('should check if value is commit', async () => {
      // Arrange
      const value = COMMITS[0]
      const args = { constraints: [{}], value }

      // Act
      await Subject.validate(value, args as ValidationArguments)

      // Expect
      expect(mockReadCommit).toBeCalledTimes(1)
    })
  })

  describe('IsCommitOptions.dir', () => {
    type Case = Testcase<number> & {
      args: Partial<ValidationArguments>
      dir: string | undefined
      value: any
    }

    const cases: Case[] = [
      {
        args: { value: COMMITS[1] },
        dir: process.env.PROJECT_CWD as string,
        expected: 1,
        value: COMMITS[1]
      }
    ]

    const name = 'should use $dir as .git directory'

    it.each<Case>(cases)(name, async testcase => {
      // Arrange
      const { dir, expected, value } = testcase
      const args = { constraints: [{ dir }] }

      // Act
      await Subject.validate(value, args as ValidationArguments)

      // Expect
      expect(mockReadCommit).toBeCalled()
      expect(mockReadCommit).toBeCalledTimes(expected)
      expect(mockReadCommit).toBeCalledWith({
        dir: args.constraints?.[0].dir,
        fs,
        oid: value
      })
    })
  })
})
