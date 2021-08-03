import type { ObjectPlain } from '@flex-development/tutils'
import type { ValidationArguments } from 'class-validator'
import fs from 'fs'
import path from 'path'
import TestSubject from '../is-path.constraint'

/**
 * @file Functional Tests - IsPathConstraint
 * @module grease/constraints/tests/functional/IsPath
 */

describe('functional:grease/constraints/IsPathConstraint', () => {
  const CONSTRAINT = TestSubject.options?.name as string
  const Subject = new TestSubject()

  describe('#validate', () => {
    const value = 'path'
    const args = { constraints: [{}], value }

    it('should format validation options', () => {
      // Act
      Subject.validate(args.value, args as ValidationArguments)

      // Expect
      expect((args.constraints[0] as ObjectPlain).context).toMatchObject({
        [CONSTRAINT]: { error: {} }
      })
    })

    it('should call #isPathLike', () => {
      // Arrange
      const spy_isPathLike = jest.spyOn(Subject, 'isPathLike')

      // Act
      Subject.validate(args.value, args as ValidationArguments)

      // Expect
      expect(spy_isPathLike).toBeCalledTimes(1)
      expect(spy_isPathLike).toBeCalledWith(args.value)
    })

    it('should convert String object into string primitive', () => {
      // Arrange
      const value = new String('path')
      const args = { constraints: [{}], value }
      const spy_value_valueOf = jest.spyOn(value, 'valueOf')

      // Act
      Subject.validate(args.value, args as ValidationArguments)

      // Expect
      expect(spy_value_valueOf).toBeCalledTimes(1)
    })

    describe('IsPathOptions.cwd', () => {
      it('should prefix value with process.cwd()', () => {
        // Arrange
        const spy_path_join = jest.spyOn(path, 'join')
        const args = { constraints: [{ cwd: true }], value }

        // Act
        Subject.validate(args.value, args as ValidationArguments)

        // Expect
        expect(spy_path_join.mock.calls[0][0]).toBe(process.cwd())
      })
    })

    describe('IsPathOptions.exists', () => {
      it('should call fs.existsSync', () => {
        // Arrange
        const spy_fs_existsSync = jest.spyOn(fs, 'existsSync')
        const args = { constraints: [{ exists: true }], value }

        // Act
        Subject.validate(args.value, args as ValidationArguments)

        // Expect
        expect(spy_fs_existsSync).toBeCalledTimes(1)
        expect(spy_fs_existsSync).toBeCalledWith(args.value)
      })
    })

    describe('IsPathOptions.gh', () => {
      it('should remove release asset display label', () => {
        // Arrange
        const spy_split = jest.spyOn(String.prototype, 'split')
        const value = '/path/to/asset.zip#My display label'
        const args = { constraints: [{ gh: true }], value }

        // Act
        Subject.validate(args.value, args as ValidationArguments)

        // Expect
        expect(spy_split).toBeCalledTimes(1)
        expect(spy_split).toBeCalledWith('#')
      })
    })
  })
})
