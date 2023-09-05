/**
 * @file Unit Tests - PackageService
 * @module grease/providers/tests/unit/PackageService
 */

import pkgjson from '#pkg' assert { type: 'json' }
import { Version } from '#src/models'
import { lookupPackageScope } from '@flex-development/mlly'
import type { PackageJson } from '@flex-development/pkg-types'
import { cast, define } from '@flex-development/tutils'
import { pathToFileURL } from 'node:url'
import TestSubject from '../package.service'

describe('unit:providers/PackageService', () => {
  describe('#init', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject()
    })

    it('should throw if package scope is invalid', () => {
      // Arrange
      const id: URL = pathToFileURL('__fixtures__/pkg/missing-manifest')
      let error!: Error

      // Act
      try {
        subject.init(id)
      } catch (e: unknown) {
        error = cast(e)
      }

      // Expect
      expect(error).to.be.instanceof(Error)
      expect(error).to.have.deep.property('cause', { id })
      expect(error).to.have.property('message', 'invalid package scope')
    })
  })

  describe('#version', () => {
    it('should return package version', () => {
      // Arrange
      const subject: TestSubject = define(new TestSubject(), 'scope', {
        value: { pkgjson }
      })

      // Act + Expect
      expect(subject.version).to.eql(new Version(pkgjson.version))
    })

    it('should throw if package version is invalid', () => {
      // Arrange
      const id: URL = pathToFileURL('__fixtures__/pkg/invalid')
      const pkgjson: PackageJson = lookupPackageScope(id)!.pkgjson
      const subject: TestSubject = new TestSubject()
      let error!: Error

      // Act
      try {
        define(subject, 'scope', { value: { pkgjson } })
        subject.version
      } catch (e: unknown) {
        error = cast(e)
      }

      // Expect
      expect(error).to.be.instanceof(Error)
      expect(error).to.have.deep.property('cause', { version: pkgjson.version })
      expect(error).to.have.property('message', 'invalid package version')
    })
  })
})
