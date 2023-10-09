/**
 * @file Functional Tests - BumpOperationHandler
 * @module grease/bump/operations/tests/functional/BumpOperationHandler
 */

import { ReleaseType } from '#src/enums'
import { PackageManifest, Version } from '#src/models'
import { ValidationService } from '#src/providers'
import type { Spy } from '#tests/interfaces'
import pathe from '@flex-development/pathe'
import type { Omit } from '@flex-development/tutils'
import { Test } from '@nestjs/testing'
import TestSubject from '../bump.handler'
import BumpOperation, { type BumpOperationDTO } from '../bump.operation'

describe('functional:bump/operations/BumpOperationHandler', () => {
  let subject: TestSubject

  beforeAll(async () => {
    subject = (await Test.createTestingModule({
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

        write = vi
          .spyOn(PackageManifest.prototype, 'write')
          .mockImplementationOnce(vi.fn().mockName('PackageManifest#write'))

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
  })
})
