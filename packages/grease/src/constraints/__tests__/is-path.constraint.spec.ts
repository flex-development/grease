import { IsPathCode as Code, IsPathMessage as Msg } from '@grease/enums'
import { stringifyType } from '@tests/utils'
import type {
  IsPathOption as Option,
  Testcase,
  TestcaseDecorator
} from '@tests/utils/types'
import type { ValidationArguments } from 'class-validator'
import TestSubject from '../is-path.constraint'

/**
 * @file Unit Tests - IsPathConstraint
 * @module grease/constraints/tests/unit/IsPath
 */

describe('unit:constraints/IsPathConstraint', () => {
  const CONSTRAINT = TestSubject.options?.name as string
  const Subject = new TestSubject()

  describe('#defaultMessage', () => {
    type Case = Testcase<keyof typeof Msg> & {
      args: Partial<ValidationArguments>
    }

    const cases: Case[] = [
      {
        args: {
          constraints: [
            {
              context: {
                [CONSTRAINT]: { error: { code: Code.DOES_NOT_EXIST } }
              }
            }
          ],
          value: 'foo'
        },
        expected: 'DOES_NOT_EXIST'
      },
      {
        args: {
          constraints: [
            {
              context: { [CONSTRAINT]: { error: { code: Code.PATH_LIKE } } },
              each: true
            }
          ],
          value: [13, 26]
        },
        expected: 'PATH_LIKE'
      }
    ]

    const name = 'should return message matching IsPathMessage.$expected'

    it.each<Case>(cases)(name, testcase => {
      // Arrange
      const { args, expected } = testcase

      // Act
      const result = Subject.defaultMessage(args as ValidationArguments)

      // Expect
      expect(result).toMatch(Msg[expected])
    })
  })

  describe('#isPathLike', () => {
    type Case = Testcase<boolean> & { value: any }

    const cases: Case[] = [
      { expected: true, value: Buffer.from('path') },
      { expected: true, value: new String('') },
      { expected: false, value: { data: [] } },
      { expected: true, value: new URL('cats', 'http://localhost:3000') },
      { expected: true, value: 'path' },
      { expected: false, value: 13 },
      { expected: false, value: true },
      { expected: false, value: null }
    ]

    cases.forEach(testcase => {
      const { expected, value } = testcase

      it(`should return ${expected} given ${stringifyType(value)}`, () => {
        expect(Subject.isPathLike(value)).toBe(expected)
      })
    })
  })

  describe('#validate', () => {
    type Case = TestcaseDecorator<boolean, Option> & {
      args: Partial<ValidationArguments>
      value: any
    }

    const path = 'foo'
    const path_readme = 'README.md'
    const path_asset = `${path_readme}#My display label`
    const path_pkg = 'package.json'
    const path_esm = '.esmrc.js'

    const cases: Case[] = [
      {
        args: { constraints: [{}], value: 13 },
        expected: false,
        option: 'no options',
        value: 13
      },
      {
        args: { constraints: [{ cwd: false }], value: path_esm },
        expected: false,
        option: 'options.cwd',
        value: path_esm
      },
      {
        args: { constraints: [{ exists: true }], value: path },
        expected: false,
        option: 'options.exists',
        value: path
      },
      {
        args: { constraints: [{ gh: false }], value: path_asset },
        expected: false,
        option: 'options.gh',
        value: path_asset
      },
      {
        args: { constraints: [{}], value: path_pkg },
        expected: true,
        option: 'no options',
        value: path_pkg
      },
      {
        args: { constraints: [{ cwd: true }], value: path_pkg },
        expected: true,
        option: 'options.cwd',
        value: path_pkg
      },
      {
        args: { constraints: [{ exists: true }], value: path_readme },
        expected: true,
        option: 'options.exists',
        value: path_readme
      },
      {
        args: { constraints: [{ gh: true }], value: path_asset },
        expected: true,
        option: 'options.gh',
        value: path_asset
      }
    ]

    const name = 'should return $expected given $value and $option'

    it.each<Case>(cases)(name, testcase => {
      // Arrange
      const { args, expected, value } = testcase

      // Act
      const result = Subject.validate(value, args as ValidationArguments)

      // Expect
      expect(result).toBe(expected)
    })
  })
})
