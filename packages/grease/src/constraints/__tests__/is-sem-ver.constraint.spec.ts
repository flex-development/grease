import pkg from '@/grease/package.json'
import { IsSemVerCode as Code, IsSemVerMessage as Msg } from '@grease/enums'
import TAGS, { VERSION_TAG_DEV } from '@grease/tests/fixtures/git-tags.fixture'
import type {
  IsSemVerOption as Option,
  TestcaseDecorator
} from '@grease/tests/utils/types'
import type { Testcase } from '@tests/utils/types'
import type { ValidationArguments } from 'class-validator'
import TestSubject from '../is-sem-ver.constraint'

/**
 * @file Unit Tests - IsSemVerConstraint
 * @module grease/constraints/tests/unit/IsSemVer
 */

describe('unit:constraints/IsSemVerConstraint', () => {
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
              cmp: [pkg.version, '==='],
              context: { [CONSTRAINT]: { error: { code: Code.CMP } } },
              each: true
            }
          ]
        },
        expected: 'CMP'
      },
      {
        args: {
          constraints: [
            {
              context: { [CONSTRAINT]: { error: { code: Code.CONFLICT } } },
              negit: true
            }
          ]
        },
        expected: 'CONFLICT'
      },
      {
        args: {
          constraints: [
            {
              context: {
                [CONSTRAINT]: { error: { code: Code.DOES_NOT_EXIST } }
              },
              each: true
            }
          ]
        },
        expected: 'DOES_NOT_EXIST'
      },
      {
        args: {
          constraints: [
            {
              context: {
                [CONSTRAINT]: { error: { code: Code.RANGE_UNSATISFIED } }
              },
              satisfies: ['1.x || >=2.5.0 || 5.0.0 - 7.2.3']
            }
          ]
        },
        expected: 'RANGE_UNSATISFIED'
      },
      {
        args: {
          constraints: [
            {
              context: { [CONSTRAINT]: { error: { code: Code.SEM_VER } } },
              each: true
            }
          ]
        },
        expected: 'SEM_VER'
      }
    ]

    const name = 'should return message matching IsSemVerMessage.$expected'

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

    const version = 'x.x.x'

    const cases: Case[] = [
      {
        args: { constraints: [{}], value: TAGS[0] },
        expected: true,
        option: 'no options',
        value: TAGS[0]
      },
      {
        args: { constraints: [{ clean: true }], value: TAGS[1] },
        expected: true,
        option: 'options.clean',
        value: TAGS[1]
      },
      {
        args: { constraints: [{ cmp: ['===', TAGS[2], {}] }], value: TAGS[2] },
        expected: true,
        option: 'options.cmp',
        value: TAGS[2]
      },
      {
        args: { constraints: [{ coerce: true }], value: TAGS[3] },
        expected: true,
        option: 'options.coerce',
        value: TAGS[3]
      },
      {
        args: { constraints: [{ clean: true, git: true }], value: TAGS[4] },
        expected: true,
        option: 'options.git',
        value: TAGS[4]
      },
      {
        args: {
          constraints: [{ clean: true, negit: true }],
          value: VERSION_TAG_DEV
        },
        expected: true,
        option: 'options.negit',
        value: VERSION_TAG_DEV
      },
      {
        args: {
          constraints: [{ satisfies: [`^${TAGS[5]}`, { loose: true }] }],
          value: TAGS[5]
        },
        expected: true,
        option: 'options.satisfies',
        value: TAGS[5]
      },
      {
        args: { constraints: [{}], value: version },
        expected: false,
        option: 'no options',
        value: version
      },
      {
        args: { constraints: [{ clean: true }], value: version },
        expected: false,
        option: 'options.clean',
        value: version
      },
      {
        args: {
          constraints: [{ cmp: ['===', version, { includePrerelease: true }] }],
          value: version
        },
        expected: false,
        option: 'options.cmp',
        value: version
      },
      {
        args: { constraints: [{ coerce: true }], value: version },
        expected: false,
        option: 'options.coerce',
        value: version
      },
      {
        args: { constraints: [{ git: true }], value: version },
        expected: false,
        option: 'options.git',
        value: version
      },
      {
        args: { constraints: [{ negit: true }], value: version },
        expected: false,
        option: 'options.negit',
        value: version
      },
      {
        args: {
          constraints: [{ satisfies: [`^${version}`, { loose: true }] }],
          value: version
        },
        expected: false,
        option: 'options.satisfies',
        value: version
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
