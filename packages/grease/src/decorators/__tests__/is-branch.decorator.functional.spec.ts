import type { OneOrMany } from '@flex-development/tutils'
import Validator from '@grease/constraints/is-branch.constraint'
import { IsBranchMessage as Msg } from '@grease/enums/is-branch-message.enum'
import type { IsBranchOptions } from '@grease/interfaces'
import BRANCHES from '@grease/tests/fixtures/git-branches.fixture'
import type {
  IsBranchOption as Option,
  TestcaseDecorator
} from '@grease/tests/utils/types'
import { validate, ValidateBy } from 'class-validator'
import TestSubject from '../is-branch.decorator'

/**
 * @file Functional Tests - IsBranch
 * @module grease/decorators/tests/functional/IsBranch
 */

const MockValidateBy = ValidateBy as jest.MockedFunction<typeof ValidateBy>

describe('functional:grease/decorators/IsBranch', () => {
  const remote: IsBranchOptions['remote'] = 'origin'
  const options: IsBranchOptions = { remote }

  describe('decorator logic', () => {
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
    type Property = OneOrMany<string>
    type Case = TestcaseDecorator<number, Option> & {
      options: IsBranchOptions
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
          code: 'LOCAL',
          expected: EXPECTED,
          option: 'no options',
          options: {},
          value: null
        },
        {
          code: 'LOCAL',
          expected: EXPECTED,
          option: 'options.dir',
          options: { dir: process.env.PROJECT_CWD },
          value: BRANCHES[404][0]
        },
        {
          code: 'REMOTE',
          expected: EXPECTED,
          option: 'options.remote',
          options: { each: true, remote },
          value: BRANCHES[404]
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
          value: BRANCHES.local[0]
        },
        {
          expected: EXPECTED,
          option: 'options.dir',
          options: { dir: process.env.PROJECT_CWD },
          value: BRANCHES.local[1]
        },
        {
          expected: EXPECTED,
          option: 'options.remote',
          options: { each: true, remote },
          value: BRANCHES.remote.slice(0, 2)
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
