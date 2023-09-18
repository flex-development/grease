/**
 * @file Unit Tests - BumpService
 * @module grease/providers/tests/unit/BumpService
 */

import pkg from '#pkg' assert { type: 'json' }
import { ReleaseType } from '#src/enums'
import type { ICommit } from '#src/interfaces'
import { Version } from '#src/models'
import type { BumpOptionsDTO } from '#src/options'
import { cast } from '@flex-development/tutils'
import { Test, type TestingModule } from '@nestjs/testing'
import TestSubject from '../bump.service'
import GitService from '../git.service'
import PackageService from '../package.service'
import ValidationService from '../validation.service'

describe('unit:providers/BumpService', () => {
  describe('#bump', () => {
    let ref: TestingModule
    let subject: TestSubject

    beforeAll(async () => {
      ref = await Test.createTestingModule({
        providers: [GitService, PackageService, TestSubject, ValidationService]
      }).compile()

      subject = ref.get(TestSubject)
    })

    it('should return current version if bump is not needed', async () => {
      // Arrange
      const opts: BumpOptionsDTO = { release: cast(pkg.version) }

      // Act
      const result = await subject.bump(opts)

      // Expect
      expect(result).to.be.instanceof(Version)
      expect(result).to.eql(new Version(opts.release))
    })
  })

  describe('#recommend', () => {
    describe.each<[
      keyof typeof ReleaseType,
      Pick<ICommit, 'breaking' | 'type'>[]
    ]>([
      ['MAJOR', [{ breaking: true, type: 'refactor' }]],
      ['MINOR', [{ breaking: false, type: 'feat' }]],
      ['PATCH', [{ breaking: false, type: 'fix' }]]
    ])('ReleaseType.%s', (key, commits) => {
      let breaks: number
      let features: number
      let ref: TestingModule

      beforeAll(async () => {
        ref = await Test.createTestingModule({
          providers: [
            PackageService,
            TestSubject,
            ValidationService,
            {
              provide: GitService,
              useValue: { commits: vi.fn(() => commits), tags: vi.fn(() => []) }
            }
          ]
        }).compile()

        breaks = key === 'MAJOR' ? commits.length : 0
        features = key === 'MINOR' ? commits.length : 0
      })

      it('should return recommended version bump object', async () => {
        // Act
        const result = await ref.get(TestSubject).recommend()

        // Expect
        expect(result).to.have.property('breaks', breaks)
        expect(result).to.have.property('bump', ReleaseType[key])
        expect(result).to.have.deep.property('commits', commits.length)
        expect(result).to.have.property('features', features)
      })
    })
  })
})
