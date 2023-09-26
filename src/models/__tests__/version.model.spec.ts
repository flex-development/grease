/**
 * @file Unit Tests - Version
 * @module grease/models/tests/unit/Version
 */

import type { BumpOperationDTO } from '#src/bump'
import { ReleaseType } from '#src/enums'
import type { ReleaseVersion } from '#src/types'
import type { SemanticVersion } from '@flex-development/pkg-types'
import { get, type Omit } from '@flex-development/tutils'
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

    it('should return this version with copied properties', () => {
      // Arrange
      const version: SemVer = new SemVer('3.0.0-rc.2')

      // Act + Expect
      expect(subject.copy(version)).to.eql({
        ...version,
        includePrerelease: get(subject, 'includePrerelease', Number.NaN),
        loose: subject.loose,
        options: subject.options
      })
    })
  })

  describe('#inc', () => {
    let subject: TestSubject

    beforeEach(() => {
      subject = new TestSubject(new SemVer('1.2.3'))
    })

    it.each<[ReleaseType, Omit<BumpOperationDTO, 'release'>, SemanticVersion]>([
      [ReleaseType.MAJOR, {}, '2.0.0'],
      [ReleaseType.MINOR, {}, '1.3.0'],
      [ReleaseType.PATCH, {}, '1.2.4'],
      [ReleaseType.PREMAJOR, { preid: 'rc' }, '2.0.0-rc.1'],
      [ReleaseType.PREMINOR, { preid: 'beta' }, '1.3.0-beta.1'],
      [ReleaseType.PREPATCH, { preid: 'alpha' }, '1.2.4-alpha.1'],
      [ReleaseType.PRERELEASE, { preid: 'alpha', prestart: 0 }, '1.2.4-alpha.0']
    ])('should return this version with %s bump applied', (
      release,
      opts,
      version
    ) => {
      // Act
      const result = subject.inc(release, opts.preid, opts.prestart)

      // Expect
      expect(result).to.equal(subject)
      expect(result).to.have.property('version', version)
      expect(result).to.have.property('raw', version)
    })

    it('should return this version with raw bump applied', () => {
      // Arrange
      const release: SemanticVersion = '2.0.0'

      // Act
      const result = subject.inc(release)

      // Expect
      expect(result).to.equal(subject)
      expect(result).to.have.property('version', release)
      expect(result).to.have.property('raw', release)
    })

    it('should throw if release is invalid', () => {
      // Arrange
      const release: ReleaseVersion = <ReleaseVersion>'pre'
      const message: string = `invalid increment argument: ${release}`
      let error!: Error

      // Act
      try {
        subject.inc(release)
      } catch (e: unknown) {
        error = <typeof error>e
      }

      // Expect
      expect(error).to.be.instanceof(Error)
      expect(error).to.have.deep.property('cause', { release })
      expect(error).to.have.property('message', message)
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
})
