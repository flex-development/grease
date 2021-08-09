import COMMITS from '@tests/fixtures/git-commit-shas.fixture'
import type { ValidationArguments } from 'class-validator'
import { readCommit } from 'isomorphic-git'
import TestSubject from '../is-commit.constraint'

/**
 * @file Functional Tests - IsCommitConstraint
 * @module grease/constraints/tests/functional/IsCommit
 */

const mockReadTree = readCommit as jest.MockedFunction<typeof readCommit>

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
      expect(mockReadTree).toBeCalledTimes(1)
    })
  })
})
