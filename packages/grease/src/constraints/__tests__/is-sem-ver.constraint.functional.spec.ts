import pkg from '@/grease/package.json'
import type { ObjectPlain } from '@flex-development/tutils'
import type { IsSemVerOptions } from '@grease/interfaces'
import type { GitSemverTagsOptions, SemanticVersion } from '@grease/types'
import semver from '@grease/utils/semver.util'
import { OPTIONS_LERNA } from '@tests/fixtures/git-tags.fixture'
import type { TestcaseCalled } from '@tests/utils/types'
import type { ValidationArguments } from 'class-validator'
import type { CoerceOptions } from 'semver'
import TestSubject from '../is-sem-ver.constraint'

/**
 * @file Functional Tests - IsSemVerConstraint
 * @module grease/constraints/tests/functional/IsSemVer
 */

jest.mock('@grease/utils/semver.util')

const mockSemver = semver as jest.Mocked<typeof semver>

describe('functional:grease/constraints/IsSemVerConstraint', () => {
  const CONSTRAINT = TestSubject.options?.name as string
  const Subject = new TestSubject()

  const version = pkg.version as SemanticVersion

  describe('#validate', () => {
    type CaseGit = TestcaseCalled & {
      calledWith: GitSemverTagsOptions
      git: IsSemVerOptions['git']
      value: string
    }

    const CASES_GIT: CaseGit[] = [
      {
        call: 'call',
        calledWith: OPTIONS_LERNA,
        expected: 1,
        git: OPTIONS_LERNA,
        value: version
      },
      { call: 'call', calledWith: {}, expected: 1, git: true, value: version }
    ]

    const args = { constraints: [{}], value: version }

    it('should format validation options', () => {
      // Act
      Subject.validate(args.value, args as ValidationArguments)

      // Expect
      expect((args.constraints[0] as ObjectPlain).context).toMatchObject({
        [CONSTRAINT]: { error: {} }
      })
    })

    describe('IsSemVerOptions.clean', () => {
      type Case = TestcaseCalled & { clean: IsSemVerOptions['clean'] }

      const cases: Case[] = [
        { call: 'call', clean: [], expected: 1 },
        { call: 'call', clean: true, expected: 1 }
      ]

      const name = 'should $call semver.clean if clean === $clean'

      it.each<Case>(cases)(name, testcase => {
        // Arrange
        const { clean, expected } = testcase
        const value = `v${pkg.version}`
        const args = { constraints: [{ clean }], value }

        // Act
        Subject.validate(value, args as ValidationArguments)

        // Expect
        expect(mockSemver.clean).toBeCalledTimes(expected)
      })
    })

    describe('IsSemVerOptions.cmp', () => {
      type Case = TestcaseCalled & { cmp: IsSemVerOptions['cmp'] }

      const cases: Case[] = [
        { call: 'call', cmp: ['===', version, {}], expected: 1 },
        { call: 'not call', cmp: [], expected: 0 }
      ]

      const name = 'should $call semver.cmp if cmp === $cmp'

      it.each<Case>(cases)(name, testcase => {
        // Arrange
        const { cmp, expected } = testcase
        const args = { constraints: [{ cmp }], value: version }

        // Act
        Subject.validate(args.value, args as ValidationArguments)

        // Expect
        expect(mockSemver.cmp).toBeCalledTimes(expected)
      })
    })

    describe('IsSemVerOptions.coerce', () => {
      type Case = TestcaseCalled & {
        calledWith: CoerceOptions
        coerce: IsSemVerOptions['coerce']
      }

      const cases: Case[] = [
        {
          call: 'call',
          calledWith: { loose: true },
          coerce: { loose: true },
          expected: 1
        },
        { call: 'call', calledWith: {}, coerce: true, expected: 1 }
      ]

      const name = 'should $call semver.coerce if coerce === $coerce'

      it.each<Case>(cases)(name, testcase => {
        // Arrange
        const { calledWith, coerce, expected } = testcase
        const args = { constraints: [{ coerce }], value: version }

        // Act
        Subject.validate(args.value, args as ValidationArguments)

        // Expect
        expect(mockSemver.coerce).toBeCalledTimes(expected)
        expect(mockSemver.coerce).toBeCalledWith(args.value, calledWith)
      })
    })

    describe('IsSemVerOptions.git', () => {
      const name = 'should $call semver.tags if git === $git'

      it.each<CaseGit>(CASES_GIT)(name, testcase => {
        // Arrange
        const { calledWith, expected, git, value } = testcase
        const args = { constraints: [{ git }], value }

        // Act
        Subject.validate(args.value, args as ValidationArguments)

        // Expect
        expect(mockSemver.tags).toBeCalledTimes(expected)
        expect(mockSemver.tags).toBeCalledWith(calledWith)
      })
    })

    describe('IsSemVerOptions.negit', () => {
      const name = 'should $call semver.tags if negit && git === $git'

      it.each<CaseGit>(CASES_GIT)(name, testcase => {
        // Arrange
        const { calledWith, expected, git, value } = testcase
        const args = { constraints: [{ git, negit: true }], value }

        // Act
        Subject.validate(args.value, args as ValidationArguments)

        // Expect
        expect(mockSemver.tags).toBeCalledTimes(expected)
        expect(mockSemver.tags).toBeCalledWith(calledWith)
      })
    })

    describe('IsSemVerOptions.satisfies', () => {
      type Case = TestcaseCalled & { satisfies: IsSemVerOptions['satisfies'] }

      const cases: Case[] = [
        {
          call: 'call',
          expected: 1,
          satisfies: [`^${version}`, { loose: true }]
        },
        { call: 'not call', expected: 0, satisfies: [] }
      ]

      const name = 'should $call semver.satisfies if satisfies === $satisfies'

      it.each<Case>(cases)(name, testcase => {
        // Arrange
        const { expected, satisfies } = testcase
        const args = { constraints: [{ satisfies }], value: version }

        // Act
        Subject.validate(args.value, args as ValidationArguments)

        // Expect
        expect(mockSemver.satisfies).toBeCalledTimes(expected)
      })
    })
  })
})
