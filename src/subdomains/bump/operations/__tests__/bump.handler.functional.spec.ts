/**
 * @file Functional Tests - BumpOperationHandler
 * @module grease/bump/operations/tests/functional/BumpOperationHandler
 */

import pkg from '#pkg' assert { type: 'json' }
import { ReleaseType } from '#src/enums'
import { LogModule } from '#src/log'
import { PackageManifest, Version } from '#src/models'
import { ValidationService } from '#src/providers'
import type { Spy } from '#tests/interfaces'
import pathe from '@flex-development/pathe'
import type { SemanticVersion } from '@flex-development/pkg-types'
import type { Omit } from '@flex-development/tutils'
import { Test } from '@nestjs/testing'
import TestSubject from '../bump.handler'
import BumpOperation, { type BumpOperationDTO } from '../bump.operation'

describe('functional:bump/operations/BumpOperationHandler', () => {
  let subject: TestSubject

  beforeAll(async () => {
    subject = (await Test.createTestingModule({
      imports: [LogModule],
      providers: [TestSubject, ValidationService]
    }).compile()).get(TestSubject)
  })

  describe('#execute', () => {
    describe.each<[
      keyof typeof ReleaseType,
      Omit<BumpOperationDTO, 'release' | 'write'>
    ]>([
      ['MAJOR', {}],
      ['MINOR', {}],
      ['PATCH', {}],
      ['PREMAJOR', { preid: 'rc', prestart: 0 }],
      ['PREMINOR', { preid: 'beta' }],
      ['PREPATCH', { preid: '' }],
      ['PRERELEASE', { preid: 'rc' }]
    ])('ReleaseType.%s', (key, opts) => {
      let inc: Spy<Version['inc']>
      let op: BumpOperation
      let release: ReleaseType
      let write: Spy<PackageManifest['write']>

      beforeAll(() => {
        op = new BumpOperation({
          ...opts,
          cwd: pathe.resolve(`__fixtures__/pkg/${release = ReleaseType[key]}`),
          release,
          write: true
        })
      })

      beforeEach(async () => {
        inc = vi.spyOn(Version.prototype, 'inc')
        write = vi.spyOn(PackageManifest.prototype, 'write')

        write = write.mockImplementationOnce(vi.fn().mockName('Manifest#write'))

        await subject.execute(op)
      })

      it('should bump manifest version', () => {
        expect(inc).toHaveBeenCalledOnce()
        expect(inc).toHaveBeenCalledWith(op.release, op.preid, op.prestart)
      })

      it('should write version bump to manifest file', () => {
        expect(write).toHaveBeenCalledOnce()
      })
    })

    describe('noop', () => {
      let inc: Spy<Version['inc']>
      let op: BumpOperation
      let write: Spy<PackageManifest['write']>

      beforeAll(() => {
        op = new BumpOperation({ release: <SemanticVersion>pkg.version })
      })

      beforeEach(() => {
        inc = vi.spyOn(Version.prototype, 'inc')
        write = vi.spyOn(PackageManifest.prototype, 'write')
      })

      it('should do nothing if bump is not needed', async () => {
        // Act
        await subject.execute(op)

        // Expect
        expect(inc).not.toHaveBeenCalled()
        expect(write).not.toHaveBeenCalled()
      })
    })
  })
})
