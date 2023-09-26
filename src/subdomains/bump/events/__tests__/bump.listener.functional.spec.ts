/**
 * @file Functional Tests - BumpEventListener
 * @module grease/bump/events/tests/functional/BumpEventListener
 */

import { RecommendedBump } from '#src/bump/models'
import { PackageManifest } from '#src/models'
import { GlobalOptions } from '#src/options'
import { LoggerService } from '#src/providers'
import type { Spy } from '#tests/interfaces'
import { Test } from '@nestjs/testing'
import BumpEvent from '../bump.event'
import TestSubject from '../bump.listener'

describe('functional:bump/events/BumpEventListener', () => {
  let subject: TestSubject

  beforeAll(async () => {
    subject = (await Test.createTestingModule({
      providers: [LoggerService, TestSubject]
    }).compile()).get(TestSubject)
  })

  describe('#handle', () => {
    let context: GlobalOptions
    let debug: Spy<LoggerService['debug']>
    let log: Spy<LoggerService['log']>
    let success: Spy<LoggerService['success']>

    beforeAll(() => {
      context = new GlobalOptions({ silent: true })
    })

    beforeEach(() => {
      debug = vi.spyOn(LoggerService.prototype, 'debug')
      log = vi.spyOn(LoggerService.prototype, 'log')
      success = vi.spyOn(LoggerService.prototype, 'success')
    })

    it('should log recommended bump', () => {
      // Arrange
      const payload: RecommendedBump = new RecommendedBump({
        breaks: 1,
        commits: 20,
        features: 1
      })

      // Act
      subject.handle(new BumpEvent(payload, context))

      // Expect
      expect(log).toHaveBeenCalledOnce()
      expect(log).toHaveBeenCalledWith(payload.bump)
      expect(debug).toHaveBeenCalledTimes(3)
      expect(debug).toHaveBeenCalledWith('commits:', payload.commits)
      expect(debug).toHaveBeenCalledWith('breaks:', payload.breaks)
      expect(debug).toHaveBeenCalledWith('features:', payload.features)
    })

    it('should log successful version bump', () => {
      // Arrange
      const payload: PackageManifest = new PackageManifest()
      const ver: string = payload.version.version

      // Act
      subject.handle(new BumpEvent(payload, context))

      // Expect
      expect(success).toHaveBeenCalledOnce()
      expect(success).toHaveBeenCalledWith('bumped manifest version to', ver)
    })
  })
})
