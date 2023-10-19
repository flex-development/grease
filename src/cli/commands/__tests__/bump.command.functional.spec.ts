/**
 * @file Functional Tests - BumpCommand
 * @module grease/cli/commands/tests/functional/BumpCommand
 */

import { RecommendedBump } from '#src/bump'
import { ReleaseType } from '#src/enums'
import GreaseService from '#src/grease.service'
import { LogObject, LoggerService } from '#src/log'
import { Version } from '#src/models'
import type { ReleaseVersion } from '#src/types'
import type { Mock } from '#tests/interfaces'
import { CliUtilityService } from '@flex-development/nest-commander'
import { CommandTestFactory } from '@flex-development/nest-commander/testing'
import type { TestingModule } from '@nestjs/testing'
import TestSubject from '../bump.command'
import GreaseCommand from '../grease.command'

describe('functional:cli/commands/BumpCommand', () => {
  let args: ['bump', ReleaseVersion]
  let bump: Mock<GreaseService['bump']>
  let command: TestingModule
  let debug: Mock<LoggerService['debug']>
  let log: Mock<LoggerService['log']>
  let recommend: Mock<GreaseService['recommend']>
  let success: Mock<LoggerService['success']>

  beforeAll(() => {
    args = ['bump', ReleaseType.PREMAJOR]
  })

  beforeEach(async () => {
    command = await CommandTestFactory.createTestingCommand({
      positional: false,
      providers: [
        CliUtilityService,
        GreaseCommand,
        LoggerService,
        TestSubject,
        {
          provide: GreaseService,
          useValue: {
            bump: bump = vi
              .fn()
              .mockReturnValue(new Version(faker.system.semver()))
              .mockName('GreaseService#bump'),
            config: vi
              .fn()
              .mockReturnValue({})
              .mockName('GreaseService#config'),
            recommend: recommend = vi
              .fn()
              .mockReturnValue(new RecommendedBump({
                breaks: 1,
                commits: 72,
                features: 16,
                unstable: true
              }))
              .mockName('GreaseService#recommend')
          }
        },
        {
          provide: LoggerService,
          useValue: {
            debug: debug = vi.fn().mockName('LoggerService#debug'),
            log: log = vi.fn().mockName('LoggerService#log'),
            success: success = vi.fn().mockName('LoggerService#success'),
            withTag: vi.fn().mockReturnValue({
              debug,
              log,
              success,
              sync: vi.fn().mockName('LoggerService#sync')
            })
          }
        }
      ]
    })
  })

  describe('--json, -j', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '--json'])

      // Expect
      expect(log).toHaveBeenCalledOnce()
      expect(log).toHaveBeenCalledWith(expect.any(LogObject))
      expect(debug).not.toHaveBeenCalled()
      expect(success).not.toHaveBeenCalled()
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '-j'])

      // Expect
      expect(log).toHaveBeenCalledOnce()
      expect(log).toHaveBeenCalledWith(expect.any(LogObject))
      expect(debug).not.toHaveBeenCalled()
      expect(success).not.toHaveBeenCalled()
    })
  })

  describe('--preid <id>', () => {
    let preid: string

    beforeAll(() => {
      preid = 'beta'
    })

    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, `--preid=${preid}`])

      // Expect
      expect(bump).toHaveBeenCalledOnce()
      expect(bump.mock.lastCall?.[0]).to.have.property('preid', preid)
      expect(success).toHaveBeenCalledOnce()
      expect(debug).not.toHaveBeenCalled()
      expect(log).not.toHaveBeenCalled()
    })
  })

  describe('--prestart <start>', () => {
    let prestart: number

    beforeAll(() => {
      prestart = 0
    })

    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, `--prestart=${prestart}`])

      // Expect
      expect(bump).toHaveBeenCalledOnce()
      expect(bump.mock.lastCall?.[0]).to.have.property('prestart', prestart)
      expect(success).toHaveBeenCalledOnce()
      expect(debug).not.toHaveBeenCalled()
      expect(log).not.toHaveBeenCalled()
    })
  })

  describe('--recommend, -r', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [args[0], '--recommend'])

      // Expect
      expect(recommend).toHaveBeenCalledOnce()
      expect(recommend).toHaveBeenCalledWith(expect.any(Object))
      expect(log).toHaveBeenCalledOnce()
      expect(debug).toHaveBeenCalledTimes(3)
      expect(success).not.toHaveBeenCalled()
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [args[0], '-r'])

      // Expect
      expect(recommend).toHaveBeenCalledOnce()
      expect(recommend).toHaveBeenCalledWith(expect.any(Object))
      expect(log).toHaveBeenCalledOnce()
      expect(debug).toHaveBeenCalledTimes(3)
      expect(success).not.toHaveBeenCalled()
    })
  })

  describe('--unstable, -u', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [args[0], '-r', '--unstable'])

      // Expect
      expect(recommend).toHaveBeenCalledOnce()
      expect(recommend.mock.lastCall?.[0]).to.have.property('unstable').be.true
      expect(log).toHaveBeenCalledOnce()
      expect(debug).toHaveBeenCalledTimes(3)
      expect(success).not.toHaveBeenCalled()
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [args[0], '-r', '-u'])

      // Expect
      expect(recommend).toHaveBeenCalledOnce()
      expect(recommend.mock.lastCall?.[0]).to.have.property('unstable').be.true
      expect(log).toHaveBeenCalledOnce()
      expect(debug).toHaveBeenCalledTimes(3)
      expect(success).not.toHaveBeenCalled()
    })
  })

  describe('--write, -w', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '--write'])

      // Expect
      expect(bump).toHaveBeenCalledOnce()
      expect(bump.mock.lastCall?.[0]).to.have.property('write').be.true
      expect(success).toHaveBeenCalledOnce()
      expect(debug).not.toHaveBeenCalled()
      expect(log).not.toHaveBeenCalled()
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '-w'])

      // Expect
      expect(bump).toHaveBeenCalledOnce()
      expect(bump.mock.lastCall?.[0]).to.have.property('write').be.true
      expect(success).toHaveBeenCalledOnce()
      expect(debug).not.toHaveBeenCalled()
      expect(log).not.toHaveBeenCalled()
    })
  })
})
