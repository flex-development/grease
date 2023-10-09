/**
 * @file Unit Tests - BumpOperationHandler
 * @module grease/bump/operations/tests/unit/BumpOperationHandler
 */

import pkg from '#pkg' assert { type: 'json' }
import { PackageManifest } from '#src/models'
import { ValidationService } from '#src/providers'
import type { Spy } from '#tests/interfaces'
import type { SemanticVersion } from '@flex-development/pkg-types'
import { Test } from '@nestjs/testing'
import TestSubject from '../bump.handler'
import BumpOperation from '../bump.operation'

describe('unit:bump/operations/BumpOperationHandler', () => {
  let subject: TestSubject

  beforeAll(async () => {
    subject = (await Test.createTestingModule({
      providers: [TestSubject, ValidationService]
    }).compile()).get(TestSubject)
  })

  describe('#execute', () => {
    let write: Spy<PackageManifest['write']>

    beforeEach(() => {
      write = vi.spyOn(PackageManifest.prototype, 'write')
    })

    it('should return unmodified manifest if bump is not needed', async () => {
      // Arrange
      const operation: BumpOperation = new BumpOperation({
        release: <SemanticVersion>pkg.version
      })

      // Act
      const result = await subject.execute(operation)

      // Expect
      expect(result).to.be.instanceof(PackageManifest)
      expect(result).to.have.nested.property('version.version', pkg.version)
      expect(write).not.toHaveBeenCalled()
    })
  })
})
