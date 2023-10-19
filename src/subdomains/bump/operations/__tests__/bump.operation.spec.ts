/**
 * @file Unit Tests - BumpOperation
 * @module grease/bump/operations/tests/unit/BumpOperation
 */

import { ReleaseType } from '#src/enums'
import { PackageManifest } from '#src/models'
import TestSubject from '../bump.operation'

describe('unit:bump/operations/BumpOperation', () => {
  describe('constructor', () => {
    let release: TestSubject['release']
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({ release: (release = ReleaseType.PREMAJOR) })
    })

    it('should set #files', () => {
      expect(subject).to.have.deep.property('files', [PackageManifest])
    })

    it('should set #preid', () => {
      expect(subject).to.have.property('preid', 'alpha')
    })

    it('should set #prestart', () => {
      expect(subject).to.have.property('prestart', 1)
    })

    it('should set #release', () => {
      expect(subject).to.have.property('release', release)
    })

    it('should set #write', () => {
      expect(subject).to.have.property('write', false)
    })
  })
})
