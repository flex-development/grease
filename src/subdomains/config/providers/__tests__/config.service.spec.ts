/**
 * @file Unit Tests - ConfigService
 * @module grease/config/providers/tests/unit/ConfigService
 */

import type { IGreaseConfig } from '#src/config/interfaces'
import { LogModule, UserLogLevel } from '#src/log'
import { ValidationService } from '#src/providers'
import type { NodeError } from '@flex-development/errnode'
import { Test } from '@nestjs/testing'
import TestSubject from '../config.service'

describe('unit:config/providers/ConfigService', () => {
  let subject: TestSubject

  beforeAll(async () => {
    subject = (await Test.createTestingModule({
      imports: [LogModule],
      providers: [TestSubject, ValidationService]
    }).compile()).get(TestSubject)
  })

  describe('#load', () => {
    it('should return empty object if config loading is skipped', async () => {
      // Arrange
      const file: string = 'grease.config.json'
      const opts: IGreaseConfig = { config: false }

      // Act + Expect
      expect(await subject.load(file, opts)).to.eql({})
    })

    it.each<[string, string, IGreaseConfig?]>([
      ['extension is invalid', '__fixtures__/pkg/invalid/.greaserc.yml'],
      ['file is not found', 'grease.config.ts'],
      ['module is invalid', '__fixtures__/pkg/invalid']
    ])('should throw if config %s', async (_, file, opts) => {
      // Arrange
      let error!: NodeError

      // Act
      try {
        await subject.load(file, { ...opts, level: UserLogLevel.SILENT })
      } catch (e) {
        error = <typeof error>e
      }

      // Expect
      expect(error).to.be.instanceof(Error)
      expect(error.code).toMatchSnapshot()
    })
  })

  describe('#search', () => {
    it('should return empty object if config is not found', async () => {
      expect(await subject.search({ cwd: '__fixtures__/pkg' })).to.eql({})
    })
  })
})
