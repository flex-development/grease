import pkg from '@/grease/package.json'
import type { OneOrMany } from '@flex-development/tutils'
import Validator from '@grease/constraints/is-sem-ver.constraint'
import { IsSemVerMessage as Msg } from '@grease/enums/is-sem-ver-message.enum'
import type { IsSemVerOptions } from '@grease/interfaces'
import type { SemanticVersion } from '@grease/types'
import { OPTIONS_LERNA } from '@tests/fixtures/git-tags.fixture'
import type {
  IsSemVerOption as Option,
  TestcaseDecorator
} from '@tests/utils/types'
import { validate, ValidateBy } from 'class-validator'
import TestSubject from '../is-sem-ver.decorator'

/**
 * @file Functional Tests - IsSemVer
 * @module grease/decorators/tests/functional/IsSemVer
 */

const MockValidateBy = ValidateBy as jest.MockedFunction<typeof ValidateBy>

describe('functional:grease/decorators/IsSemVer', () => {
  const version = pkg.version as SemanticVersion

  describe('decorator logic', () => {
    const options: IsSemVerOptions = {
      cmp: [],
      coerce: true,
      git: true,
      negit: false,
      satisfies: []
    }

    it('should create property decorator', () => {
      // Act
      TestSubject(options)

      // Expect
      expect(MockValidateBy).toBeCalledTimes(1)
    })

    it('should push options into constraints array', () => {
      // Act
      TestSubject(options)

      // Expect
      expect(MockValidateBy.mock.calls[0][0].constraints).toIncludeSameMembers([
        options
      ])
    })
  })

  describe('validation', () => {
    type Property = OneOrMany<SemanticVersion>
    type Case = TestcaseDecorator<number, Option> & {
      options: IsSemVerOptions
    }

    describe('fails', () => {
      type CaseFail = Case & {
        code: keyof typeof Msg
        value: OneOrMany<any>
      }

      const CONSTRAINT = Validator.options?.name as string
      const EXPECTED = 1

      const cases: CaseFail[] = [
        {
          code: 'SEM_VER',
          expected: EXPECTED,
          option: 'no options',
          options: {},
          value: null
        },
        {
          code: 'SEM_VER',
          expected: EXPECTED,
          option: 'options.clean',
          options: { clean: true },
          value: `${OPTIONS_LERNA.package}@${pkg.version}`
        },
        {
          code: 'CMP',
          expected: EXPECTED,
          option: 'options.cmp',
          options: { cmp: ['>', version] },
          value: version
        },
        {
          code: 'SEM_VER',
          expected: EXPECTED,
          option: 'options.coerce',
          options: { coerce: true },
          value: undefined
        },
        {
          code: 'DOES_NOT_EXIST',
          expected: EXPECTED,
          option: 'options.git',
          options: { git: true },
          value: '3.13.98'
        },
        {
          code: 'CONFLICT',
          expected: EXPECTED,
          option: 'options.negit',
          options: { negit: true },
          value: version
        },
        {
          code: 'RANGE_UNSATISFIED',
          expected: EXPECTED,
          option: 'options.satisfies',
          options: { satisfies: ['^2.0.0'] },
          value: version
        }
      ]

      const name = 'should fail given $value and $option'

      it.each<CaseFail>(cases)(name, async testcase => {
        // Arrange
        const { code, expected, options, value } = testcase

        const message_regex = new RegExp(Msg[code].replace('$property', ''))

        class TestClass {
          @TestSubject(options)
          $property: CaseFail['value']

          constructor($property: TestClass['$property']) {
            this.$property = $property
          }
        }

        // Act
        const errors = await validate(new TestClass(value))

        //  Expect
        expect(errors).toBeArrayOfSize(expected)
        expect(errors[0].constraints?.[CONSTRAINT]).toMatch(message_regex)
      })
    })

    describe('passes', () => {
      type CasePass = Case & { value: OneOrMany<Property> }

      const EXPECTED = 0

      const cases: CasePass[] = [
        {
          expected: EXPECTED,
          option: 'no options',
          options: {},
          value: version
        },
        {
          expected: EXPECTED,
          option: 'options.clean',
          options: { clean: true },
          value: `v${version}` as SemanticVersion
        },
        {
          expected: EXPECTED,
          option: 'options.cmp',
          options: { cmp: ['===', version], each: true },
          value: [version]
        },
        {
          expected: EXPECTED,
          option: 'options.coerce',
          options: { coerce: true },
          value: '13' as SemanticVersion
        },
        {
          expected: EXPECTED,
          option: 'options.git',
          options: { each: true, git: OPTIONS_LERNA },
          value: [version]
        },
        {
          expected: EXPECTED,
          option: 'options.negit',
          options: { each: true, git: true, negit: true },
          value: ['3.13.98-dev.640']
        },
        {
          expected: EXPECTED,
          option: 'options.satisfies',
          options: { satisfies: [`<=${version}`] },
          value: version
        }
      ]

      const name = 'should pass given $value and $option'

      it.each<CasePass>(cases)(name, async testcase => {
        // Arrange
        const { expected, options, value } = testcase

        class TestClass {
          @TestSubject(options)
          $property: CasePass['value']

          constructor($property: TestClass['$property']) {
            this.$property = $property
          }
        }

        // Act
        const errors = await validate(new TestClass(value))

        //  Expect
        expect(errors).toBeArrayOfSize(expected)
      })
    })
  })
})
