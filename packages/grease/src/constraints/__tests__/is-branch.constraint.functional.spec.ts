import type { ObjectPlain } from '@flex-development/tutils'
import BRANCHES from '@grease/tests/fixtures/git-branches.fixture'
import type { Testcase } from '@tests/utils/types'
import type { ValidationArguments } from 'class-validator'
import fs from 'fs'
import { listBranches } from 'isomorphic-git'
import TestSubject from '../is-branch.constraint'

/**
 * @file Functional Tests - IsBranchConstraint
 * @module grease/constraints/tests/functional/IsBranch
 */

const mockListBranches = listBranches as jest.MockedFunction<
  typeof listBranches
>

describe('functional:constraints/IsBranchConstraint', () => {
  const CONSTRAINT = TestSubject.options?.name as string
  const Subject = new TestSubject()

  describe('#validate', () => {
    const value = 'next'
    const args = { constraints: [{}], value }

    it('should format validation options', async () => {
      // Act
      await Subject.validate(args.value, args as ValidationArguments)

      // Expect
      expect((args.constraints[0] as ObjectPlain).context).toMatchObject({
        [CONSTRAINT]: { error: {} }
      })
    })

    describe('IsBranchOptions.dir', () => {
      type Case = Testcase<number> & {
        args: Partial<ValidationArguments>
        dir: string | undefined
        value: any
      }

      const cases: Case[] = [
        {
          args: { value: BRANCHES.local[0] },
          dir: process.env.PROJECT_CWD as string,
          expected: 1,
          value: BRANCHES.local[0]
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
        expect(mockListBranches).toBeCalled()
        expect(mockListBranches).toBeCalledTimes(expected)
        expect(mockListBranches).toBeCalledWith({
          dir: args.constraints?.[0].dir,
          fs,
          remote: undefined
        })
      })
    })

    describe('IsBranchOptions.remote', () => {
      type Case = Testcase<number> & {
        args: Partial<ValidationArguments>
        type: 'local' | 'remote'
        value: any
      }

      const cases: Case[] = [
        {
          args: { constraints: [{}], value: BRANCHES.local[0] },
          expected: 1,
          type: 'local',
          value: BRANCHES.local[0]
        },
        {
          args: { constraints: [{}], value: BRANCHES.remote[0] },
          expected: 1,
          type: 'remote',
          value: BRANCHES.remote[0]
        }
      ]

      const name = 'should check if $value is $type branch'

      it.each<Case>(cases)(name, async testcase => {
        // Arrange
        const { args, expected, value } = testcase

        // Act
        await Subject.validate(value, args as ValidationArguments)

        // Expect
        expect(mockListBranches).toBeCalled()
        expect(mockListBranches).toBeCalledTimes(expected)
        expect(mockListBranches).toBeCalledWith({
          dir: process.env.PROJECT_CWD,
          fs,
          remote: undefined
        })
      })
    })
  })
})
