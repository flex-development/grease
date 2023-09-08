/**
 * @file Unit Tests - BumpService
 * @module grease/providers/tests/unit/BumpService
 */

import pkg from '#pkg' assert { type: 'json' }
import { Version } from '#src/models'
import type { BumpOptionsDTO } from '#src/options'
import { cast } from '@flex-development/tutils'
import { Test, type TestingModule } from '@nestjs/testing'
import { ValidationError } from 'class-validator'
import TestSubject from '../bump.service'
import PackageService from '../package.service'

describe('unit:providers/BumpService', () => {
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    ref = await Test.createTestingModule({
      providers: [TestSubject, PackageService]
    }).compile()

    subject = ref.get(TestSubject)
  })

  describe('#bump', () => {
    it('should return current version if bump is not needed', async () => {
      // Arrange
      const opts: BumpOptionsDTO = { release: cast(pkg.version) }

      // Act
      const result = await subject.bump(opts)

      // Expect
      expect(result).to.be.instanceof(Version)
      expect(result).to.eql(new Version(opts.release))
    })

    it('should throw if opts.release is invalid', async () => {
      // Arrange
      const opts: BumpOptionsDTO = { release: cast('pre') }
      let errors!: ValidationError[]

      // Act
      try {
        await subject.bump(opts)
      } catch (e: unknown) {
        errors = cast(e)
      }

      // Expect
      expect(errors).to.be.an('array').of.length(1)
      expect(errors[0]).to.be.instanceof(ValidationError)
      expect(errors[0]).to.have.property('property', 'release')
      expect(errors[0]).to.have.property('value', opts.release)
      expect(errors[0]).to.have.deep.property('constraints', {
        isReleaseVersion: 'release must be a release type or semantic version'
      })
    })
  })
})
