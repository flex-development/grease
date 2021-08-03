import type { OneOrMany } from '@flex-development/tutils'
import Validator from '@grease/constraints/is-path.constraint'
import { IsPathMessage as Msg } from '@grease/enums/is-path-message.enum'
import type { IsPathOptions } from '@grease/interfaces'
import type { PathLike } from '@grease/types'
import type {
  IsPathOption as Option,
  TestcaseDecorator
} from '@tests/utils/types'
import { validate, ValidateBy } from 'class-validator'
import TestSubject from '../is-path.decorator'

/**
 * @file Functional Tests - IsPath
 * @module grease/decorators/tests/functional/IsPath
 */

const MockValidateBy = ValidateBy as jest.MockedFunction<typeof ValidateBy>

describe('functional:grease/decorators/IsPath', () => {
  describe('decorator logic', () => {
    const options: IsPathOptions = { cwd: true, exists: true, gh: true }

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
    type Property = OneOrMany<PathLike>
    type Case = TestcaseDecorator<number, Option> & {
      options: IsPathOptions
    }

    describe('fails', () => {
      type CaseFail = Case & {
        code: keyof typeof Msg
        value: OneOrMany<any>
      }

      const CONSTRAINT = Validator.options?.name as string
      const EXPECTED = 1

      const path_asset = '/path/to/asset.zip#My display label'

      const cases: CaseFail[] = [
        {
          code: 'PATH_LIKE',
          expected: EXPECTED,
          option: 'no options',
          options: {},
          value: null
        },
        {
          code: 'PATH_LIKE',
          expected: EXPECTED,
          option: 'options.cwd',
          options: { cwd: true, each: true },
          value: [13]
        },
        {
          code: 'DOES_NOT_EXIST',
          expected: EXPECTED,
          option: 'options.exists',
          options: { exists: true },
          value: ''
        },
        {
          code: 'DOES_NOT_EXIST',
          expected: EXPECTED,
          option: 'options.gh',
          options: { gh: true },
          value: path_asset
        }
      ]

      it.each<CaseFail>(cases)('should fail with $option', async testcase => {
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

      const path_asset = 'README.md#My display label'

      const cases: CasePass[] = [
        {
          expected: EXPECTED,
          option: 'no options',
          options: { each: true },
          value: [__filename]
        },
        {
          expected: EXPECTED,
          option: 'options.cwd',
          options: { cwd: true },
          value: 'package.json'
        },
        {
          expected: EXPECTED,
          option: 'options.exists',
          options: { each: true, exists: true },
          value: ['package.json', 'tsconfig.json']
        },
        {
          expected: EXPECTED,
          option: 'options.gh',
          options: { gh: true },
          value: path_asset
        }
      ]

      it.each<CasePass>(cases)('should pass with $option', async testcase => {
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
