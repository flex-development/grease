/**
 * @file Unit Tests - ConfigService
 * @module grease/config/providers/tests/unit/ConfigService
 */

import type { IGreaseConfig } from '#src/config/interfaces'
import { LogModule } from '#src/log'
import { ValidationService } from '#src/providers'
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
    it.each<[string, string, IGreaseConfig?]>([
      ['config is not found', '.greaserc.json5'],
      ['file extension is invalid', '__fixtures__/pkg/invalid/.greaserc.yml'],
      ['opts.config === false', 'grease.config.json', { config: false }]
    ])('should return empty object if %s', async (_, file, opts) => {
      expect(await subject.load(file, opts)).to.eql({})
    })
  })

  describe('#search', () => {
    it('should return empty object if config is not found', async () => {
      expect(await subject.search({ cwd: '__fixtures__/pkg' })).to.eql({})
    })
  })
})
