/**
 * @file Unit Tests - BumpService
 * @module grease/providers/tests/unit/BumpService
 */

import pkg from '#pkg' assert { type: 'json' }
import { Version } from '#src/models'
import type { BumpOptionsDTO } from '#src/options'
import AggregateError from '@flex-development/aggregate-error-ponyfill'
import { cast } from '@flex-development/tutils'
import { Test, type TestingModule } from '@nestjs/testing'
import TestSubject from '../bump.service'
import PackageService from '../package.service'
import ValidationService from '../validation.service'

describe('unit:providers/BumpService', () => {
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    ref = await Test.createTestingModule({
      providers: [PackageService, TestSubject, ValidationService]
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
      let error!: AggregateError

      // Act
      try {
        await subject.bump(opts)
      } catch (e: unknown) {
        error = cast(e)
      }

      // Expect
      expect(error).to.be.instanceof(AggregateError)
    })
  })
})
