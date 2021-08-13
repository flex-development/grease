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
const mockBranchValidate = MockIsBranchConstraint.prototype
  .validate as jest.MockedFunction<
  typeof MockIsBranchConstraint.prototype.validate
>
const mockCommitValidate = MockIsCommitConstraint.prototype
  .validate as jest.MockedFunction<
  typeof MockIsCommitConstraint.prototype.validate
>

describe('functional:constraints/IsTargetBranchConstraint', () => {
  const CONSTRAINT = TestSubject.options?.name as string
  const Subject = new TestSubject()
  const dir = process.env.PWD

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

    describe('IsTargetBranchOptions.dir', () => {
      const args = { constraints: [{ dir }], value: 'main' }

      it(`should use ${dir} as .git directory`, async () => {
        // Arrange
        const mockBranchValidateCalls = mockBranchValidate.mock.calls
        const mockCommitValidateCalls = mockCommitValidate.mock.calls

        // Act
        await Subject.validate(args.value, args as ValidationArguments)

        // Expect
        expect(mockBranchValidateCalls[0][1]?.constraints?.[0].dir).toBe(dir)
        expect(mockCommitValidateCalls[0][1]?.constraints?.[0].dir).toBe(dir)
      })
    })

    describe('IsTargetBranchOptions.remote', () => {
      const constraints = [{ dir, remote: 'prod' }]
      const args = { constraints: [...constraints], value: 'next' }

      const mockBranchValidate = MockIsBranchConstraint.prototype.validate

      it(`should check if ${args.value} is remote branch`, async () => {
        // Act
        await Subject.validate(args.value, args as ValidationArguments)

        // Expect
        expect(mockBranchValidate).toBeCalledTimes(1)
        expect(mockBranchValidate).toBeCalledWith(args.value, { constraints })
      })
    })

    describe('IsTargetBranchOptions.sha', () => {
      const constraints = [{ dir }]
      const args = {
        constraints: [{ ...constraints[0], sha: true }],
        value: faker.git.commitSha()
      }

      it(`should check if ${args.value} is commit`, async () => {
        // Act
        await Subject.validate(args.value, args as ValidationArguments)

        // Expect
        expect(mockCommitValidate).toBeCalledTimes(1)
        expect(mockCommitValidate).toBeCalledWith(args.value, { constraints })
      })
    })
  })
})
