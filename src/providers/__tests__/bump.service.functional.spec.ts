/**
 * @file Functional Tests - BumpService
 * @module grease/providers/tests/functional/BumpService
 */

import { ReleaseType } from '#src/enums'
import type { BumpOptionsDTO } from '#src/options'
import type { Spy } from '#tests/interfaces'
import type { SemanticVersion } from '@flex-development/pkg-types'
import type { EmptyArray, Omit } from '@flex-development/tutils'
import { Test, type TestingModule } from '@nestjs/testing'
import consola from 'consola'
import fs from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import TestSubject from '../bump.service'
import PackageService from '../package.service'
import ValidationService from '../validation.service'

describe('functional:providers/BumpService', () => {
  let ref: TestingModule
  let manifest: PackageService
  let subject: TestSubject

  beforeAll(async () => {
    ref = await Test.createTestingModule({
      providers: [PackageService, TestSubject, ValidationService]
    }).compile()

    manifest = ref.get(PackageService)
    subject = ref.get(TestSubject)
  })

  describe('#bump', () => {
    describe.each<[
      keyof typeof ReleaseType,
      Omit<BumpOptionsDTO, 'release'>,
      SemanticVersion
    ]>([
      ['MAJOR', {}, '6.0.0'],
      ['MINOR', {}, '1.6.0'],
      ['PATCH', {}, '4.1.3'],
      ['PREMAJOR', { preid: 'rc', prestart: 0 }, '3.0.0-rc.0'],
      ['PREMINOR', { preid: 'beta' }, '2.2.0-beta.1'],
      ['PREPATCH', { preid: '' }, '2.4.4-1'],
      ['PRERELEASE', { preid: 'rc' }, '5.0.0-rc.3']
    ])('ReleaseType.%s', (key, opts, version) => {
      let release: ReleaseType
      let success: Spy<(typeof consola)['success']>
      let writeFile: Spy<(typeof fs)['writeFile']>

      beforeAll(() => {
        release = ReleaseType[key]
      })

      beforeEach(async () => {
        success = vi.spyOn(consola, 'success')
        writeFile = vi.spyOn(fs, 'writeFile')

        success.mockImplementationOnce(vi.fn<EmptyArray>())
        writeFile.mockImplementationOnce(vi.fn<EmptyArray>())

        await subject.bump({
          ...opts,
          manifest: pathToFileURL(`__fixtures__/pkg/${release}`),
          release,
          write: true
        })
      })

      it('should bump package version', () => {
        expect(manifest.scope.pkgjson.version).to.not.equal(version)
      })

      it('should log bump success message', () => {
        expect(success).toHaveBeenCalledWith('bumped version to', version)
      })

      it('should write version bump to package manifest file', () => {
        expect(writeFile).toHaveBeenCalledWith(
          fileURLToPath(manifest.scope.pkg),
          JSON.stringify({ ...manifest.scope.pkgjson, version }, null, 2) + '\n'
        )
      })
    })
  })
})
