/**
 * @file Unit Tests - IsReleaseVersionConstraint
 * @module grease/decorators/tests/unit/IsReleaseVersionConstraint
 */

import { ReleaseType } from '#src/enums'
import { cast } from '@flex-development/tutils'
import TestSubject from '../is-release-version.constraint'

describe('unit:decorators/IsReleaseVersionConstraint', () => {
  let subject: TestSubject

  beforeAll(() => {
    subject = new TestSubject()
  })

  describe('#defaultMessage', () => {
    it('should return default validation failure message', () => {
      expect(subject.defaultMessage(cast({ value: 0 })))
        .to.equal('$property must be a release type or semantic version')
    })
  })

  describe('#validate', () => {
    it('should return false if value is not a release type or version', () => {
      // Arrange
      const cases: Parameters<TestSubject['validate']>[] = [
        [faker.number.float().toString()],
        [faker.number.int().toString()],
        [faker.vehicle.vin()],
        [null]
      ]

      // Act + Expect
      cases.forEach(([value]) => expect(subject.validate(value)).to.be.false)
    })

    it('should return true if value is a release type', () => {
      // Arrange
      const cases: Parameters<TestSubject['validate']>[] = [
        [ReleaseType.MAJOR],
        [ReleaseType.MINOR],
        [ReleaseType.PATCH],
        [ReleaseType.PREMAJOR],
        [ReleaseType.PREMINOR],
        [ReleaseType.PREPATCH]
      ]

      // Act + Expect
      cases.forEach(([value]) => expect(subject.validate(value)).to.be.true)
    })

    it('should return true if value is a semantic version', () => {
      // Arrange
      const cases: Parameters<TestSubject['validate']>[] = [
        [faker.system.semver()],
        [faker.system.semver() + `-alpha.2+${faker.git.commitSha()}`]
      ]

      // Act + Expect
      cases.forEach(([value]) => expect(subject.validate(value)).to.be.true)
    })
  })
})
