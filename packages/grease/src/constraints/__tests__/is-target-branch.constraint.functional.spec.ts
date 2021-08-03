import type { ObjectPlain } from '@flex-development/tutils'
import type { ValidationArguments } from 'class-validator'
import faker from 'faker'
import { mocked } from 'ts-jest/utils'
import IsBranchConstraint from '../is-branch.constraint'
import IsCommitConstraint from '../is-commit.constraint'
import TestSubject from '../is-target-branch.constraint'

/**
 * @file Functional Tests - IsTargetBranchConstraint
 * @module grease/constraints/tests/functional/IsTargetBranch
 */

jest.mock('../is-branch.constraint')
jest.mock('../is-commit.constraint')

const MockIsBranchConstraint = mocked(IsBranchConstraint)
const MockIsCommitConstraint = mocked(IsCommitConstraint)

describe('functional:grease/constraints/IsTargetBranchConstraint', () => {
  const CONSTRAINT = TestSubject.options?.name as string
  const Subject = new TestSubject()

  describe('#validate', () => {
    const value = 'target-branch'
    const args = { constraints: [{}], value }

    it('should format validation options', async () => {
      // Act
      await Subject.validate(args.value, args as ValidationArguments)

      // Expect
      expect((args.constraints[0] as ObjectPlain).context).toMatchObject({
        [CONSTRAINT]: { error: {} }
      })
    })

    describe('IsTargetBranchOptions.remote', () => {
      const value = 'main'
      const constraints = [{ remote: 'prod' }]
      const args = { constraints: [...constraints], value }

      const mockBranchValidate = MockIsBranchConstraint.prototype.validate

      it('should call IsBranchConstraint#validate', async () => {
        // Act
        await Subject.validate(args.value, args as ValidationArguments)

        // Expect
        expect(mockBranchValidate).toBeCalledTimes(1)
        expect(mockBranchValidate).toBeCalledWith(value, { constraints })
      })
    })

    describe('IsTargetBranchOptions.sha', () => {
      const value = faker.git.commitSha()
      const args = { constraints: [{ sha: true }], value }

      const mockCommitValidate = MockIsCommitConstraint.prototype.validate

      it('should call IsCommitConstraint#validate', async () => {
        // Act
        await Subject.validate(args.value, args as ValidationArguments)

        // Expect
        expect(mockCommitValidate).toBeCalledTimes(1)
        expect(mockCommitValidate).toBeCalledWith(args.value)
      })
    })
  })
})
