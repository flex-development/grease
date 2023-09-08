/**
 * @file Unit Tests - IsManifestIdConstraint
 * @module grease/decorators/tests/unit/IsManifestIdConstraint
 */

import pkg from '#pkg' assert { type: 'json' }
import pathe from '@flex-development/pathe'
import { DOT, cast } from '@flex-development/tutils'
import { pathToFileURL } from 'node:url'
import TestSubject from '../is-manifest-id.constraint'

describe('unit:decorators/IsManifestIdConstraint', () => {
  let subject: TestSubject

  beforeAll(() => {
    subject = new TestSubject()
  })

  describe('#defaultMessage', () => {
    it('should return default validation failure message', () => {
      expect(subject.defaultMessage(cast({ value: import.meta.url })))
        .to.equal('$property must be module id of package directory or file')
    })
  })

  describe('#validate', () => {
    it('should return false if value is not a manifest module id', () => {
      // Arrange
      const cases: Parameters<TestSubject['validate']>[] = [
        [faker.vehicle.vin()],
        [import.meta.url],
        [new URL(pkg.repository)],
        [pathe.resolve('loader.mjs')],
        [undefined]
      ]

      // Act + Expect
      cases.forEach(([value]) => expect(subject.validate(value)).to.be.false)
    })

    it('should return true if value is a manifest module id', () => {
      // Arrange
      const cases: Parameters<TestSubject['validate']>[] = [
        [DOT],
        [pathToFileURL('package.json')],
        [pathToFileURL('package.json').href],
        [pathToFileURL('node_modules/@flex-development/nest-commander').href],
        [pathToFileURL(DOT)],
        [pathe.resolve('node_modules/@flex-development/tutils')],
        [pathe.resolve('package.json')],
        [pathe.resolve()]
      ]

      // Act + Expect
      cases.forEach(([value]) => expect(subject.validate(value)).to.be.true)
    })
  })
})
