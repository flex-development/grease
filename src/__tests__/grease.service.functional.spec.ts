/**
 * @file Functional Tests - GreaseService
 * @module grease/tests/functional/GreaseService
 */

import { BumpModule } from '#src/bump'
import { ConfigModule, ConfigService } from '#src/config'
import { GitModule } from '#src/git'
import { LogModule } from '#src/log'
import type { Mock } from '#tests/interfaces'
import pathe from '@flex-development/pathe'
import { CqrsModule } from '@nestjs/cqrs'
import { Test } from '@nestjs/testing'
import TestSubject from '../grease.service'

describe('functional:GreaseService', () => {
  let subject: TestSubject

  beforeAll(async () => {
    subject = (await (await Test.createTestingModule({
      imports: [
        BumpModule,
        ConfigModule,
        CqrsModule,
        GitModule,
        LogModule.forRoot({ tag: TestSubject.NAME })
      ],
      providers: [TestSubject]
    }).compile()).init()).get(TestSubject)
  })

  describe('#config', () => {
    let load: Mock<ConfigService['load']>
    let search: Mock<ConfigService['search']>

    beforeAll(() => {
      load = vi.fn().mockName('gc.load')
      search = vi.fn().mockName('gc.search')
    })

    beforeEach(() => {
      vi.spyOn(ConfigService.prototype, 'load').mockImplementationOnce(load)
      vi.spyOn(ConfigService.prototype, 'search').mockImplementationOnce(search)
    })

    it('should load configuration options from opts.config', async () => {
      // Arrange
      const config: string = 'grease.config.json'

      // Act
      await subject.config({ config })

      // Expect
      expect(load).toHaveBeenCalledOnce()
      expect(load).toHaveBeenCalledWith(pathe.resolve(config), { config })
    })

    it('should search for configuration options', async () => {
      // Act
      await subject.config()

      // Expect
      expect(search).toHaveBeenCalledOnce()
      expect(search).toHaveBeenCalledWith(undefined)
    })
  })
})
