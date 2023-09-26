/**
 * @file Unit Tests - AbstractManifest
 * @module grease/models/tests/unit/AbstractManifest
 */

import { toURL } from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import { DOT } from '@flex-development/tutils'
import PackageManifest from '../manifest-package.model'
import TestSubject from '../manifest.abstract'

describe('unit:models/AbstractManifest', () => {
  let subject: TestSubject

  beforeAll(() => {
    subject = new PackageManifest()
  })

  describe('constructor', () => {
    it('should set #dir', () => {
      expect(subject).to.have.property('dir', toURL(DOT).pathname)
    })

    it('should throw if manifest directory is not found', () => {
      // Arrange
      const dir: string = 'package.json'
      let error!: Error

      // Act
      try {
        new PackageManifest(dir)
      } catch (e: unknown) {
        error = <typeof error>e
      }

      // Expect
      expect(error).to.be.instanceof(Error)
      expect(error).to.have.deep.property('cause', { dir: toURL(dir).pathname })
      expect(error).to.have.property('message', 'manifest directory not found')
    })
  })

  describe('#file', () => {
    it('should return absolute path to manifest', () => {
      expect(subject).to.have.property('file', pathe.resolve(subject.filename))
    })
  })
})
