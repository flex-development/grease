/**
 * @file Unit Tests - PackageManifest
 * @module grease/models/tests/unit/PackageManifest
 */

import pkg from '#pkg' assert { type: 'json' }
import { ReleaseType } from '#src/enums'
import type { SemanticVersion } from '@flex-development/pkg-types'
import { set, type EmptyArray, type Nullable } from '@flex-development/tutils'
import fs from 'node:fs'
import TestSubject from '../manifest-package.model'
import Version from '../version.model'

describe('unit:models/PackageManifest', () => {
  let subject: TestSubject

  beforeAll(() => {
    subject = new TestSubject()
  })

  describe('constructor', () => {
    it('should set #filename', () => {
      expect(subject).to.have.property('filename', 'package.json')
    })

    it('should set #pkg', () => {
      expect(subject).to.have.deep.property('pkg', pkg)
    })

    it('should throw if package.json is not found', () => {
      // Arrange
      const dir: string = '__fixtures__'
      let error!: Error

      // Act
      try {
        new TestSubject(dir)
      } catch (e: unknown) {
        error = <typeof error>e
      }

      // Expect
      expect(error).to.be.instanceof(Error)
      expect(error).to.have.deep.property('cause', { dir })
      expect(error).to.have.property('message', 'package.json not found')
    })
  })

  describe('#version', () => {
    describe('get', () => {
      it('should return package version', () => {
        expect(subject)
          .to.have.deep.property('version', new Version(pkg.version))
      })

      it('should throw if package version is invalid', () => {
        // Arrange
        const version: Nullable<SemanticVersion> = null
        let error!: Error

        // Act
        try {
          set(new TestSubject(), 'pkg', { version }).version
        } catch (e: unknown) {
          error = <typeof error>e
        }

        // Expect
        expect(error).to.be.instanceof(Error)
        expect(error).to.have.deep.property('cause', { version })
        expect(error).to.have.property('message', 'invalid package version')
      })
    })

    describe('set', () => {
      let version: Version
      let subject: TestSubject

      beforeAll(() => {
        version = new Version(pkg.version).inc(ReleaseType.PREMAJOR, 'rc')
        subject = new TestSubject()
        assert(version.version !== subject.version.version)
      })

      it('should set package version', () => {
        // Act
        subject.version = version

        // Expect
        expect(subject.pkg).to.have.property('version', version.version)
      })
    })

    describe('#write', () => {
      beforeEach(() => {
        vi.spyOn(fs, 'writeFileSync').mockImplementation(vi.fn<EmptyArray>())
      })

      it('should return this manifest', () => {
        expect(subject.write()).to.equal(subject)
      })
    })
  })
})
