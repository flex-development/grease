/**
 * @file Unit Tests - Version
 * @module grease/models/tests/unit/Version
 */

import type { SemanticVersion } from '@flex-development/pkg-types'
import { SemVer } from 'semver'
import TestSubject from '../version.model'

describe('unit:models/Version', () => {
  describe('#copy', () => {
    let subject: TestSubject
    let version: string

    beforeAll(() => {
      version = '1.2.3-alpha.1+041aa02a7d9949431c6941d043844e7b15d7541d'
      subject = new TestSubject(version)
    })

    it('should return this version with updated properties', () => {
      // Arrange
      const ver: SemVer = new SemVer('3.0.0-rc.2', {
        includePrerelease: true,
        loose: true
      })

      // Act + Expect
      expect(subject.copy(ver)).to.eql(ver)
    })
  })

  describe('#toString', () => {
    it('should return semantic version string', () => {
      // Arrange
      const version: SemanticVersion = '3.1.3'

      // Act + Expect
      expect(new TestSubject(version).toString()).to.equal(version)
    })
  })
})
