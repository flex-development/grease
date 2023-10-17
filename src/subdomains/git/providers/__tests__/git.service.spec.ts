/**
 * @file Unit Tests - GitService
 * @module grease/git/providers/tests/unit/GitService
 */

import sha from '#fixtures/git/grease/sha'
import pkg from '#pkg' assert { type: 'json' }
import { LogModule } from '#src/log'
import { Test } from '@nestjs/testing'
import TestSubject from '../git.service'

describe('unit:git/providers/GitService', () => {
  let subject: TestSubject

  beforeAll(async () => {
    subject = (await Test.createTestingModule({
      imports: [LogModule],
      providers: [TestSubject]
    }).compile()).get(TestSubject)
  })

  describe('#exec', () => {
    it('should return command output', async () => {
      // Arrange
      const args: string[] = ['config', '--get', 'remote.origin.url']
      const url: string = pkg.repository.replace(/\.git$/, '')

      // Act + Expect
      expect(await subject.exec(args)).to.startWith(url)
    })

    it('should throw if command fails', async () => {
      // Arrange
      let error!: Error

      // Act
      try {
        await subject.exec(['describe', sha.slice(-7)])
      } catch (e: unknown) {
        error = <typeof error>e
      }

      // Expect
      expect(error).to.be.instanceof(Error)
      expect(error).to.have.property('cause').with.all.keys(['cmd', 'code'])
      expect(error).to.have.property('message').not.startWith('fatal:')
    })
  })
})
