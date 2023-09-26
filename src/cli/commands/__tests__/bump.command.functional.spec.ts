/**
 * @file Functional Tests - BumpCommand
 * @module grease/cli/commands/tests/functional/BumpCommand
 */

import { ReleaseType } from '#src/enums'
import GreaseService from '#src/grease.service'
import type { ReleaseVersion } from '#src/types'
import type { Mock } from '#tests/interfaces'
import {
  CliUtilityService,
  Program
} from '@flex-development/nest-commander'
import type { CommanderError } from '@flex-development/nest-commander/commander'
import { CommandTestFactory } from '@flex-development/nest-commander/testing'
import type { Fn } from '@flex-development/tutils'
import type { TestingModule } from '@nestjs/testing'
import TestSubject from '../bump.command'

describe('functional:cli/commands/BumpCommand', () => {
  let bump: Mock<GreaseService['bump']>
  let command: TestingModule
  let exitOverride: Mock<Fn<[CommanderError]>>
  let recommend: Mock<GreaseService['recommend']>

  beforeAll(() => {
    exitOverride = vi.fn<[CommanderError]>((e: CommanderError) => {
      throw e
    })
  })

  beforeEach(async () => {
    command = await CommandTestFactory.createTestingCommand({
      providers: [
        CliUtilityService,
        TestSubject,
        {
          provide: GreaseService,
          useValue: {
            bump: bump = vi.fn().mockName('GreaseService#bump'),
            recommend: recommend = vi.fn().mockName('GreaseService#recommend')
          }
        }
      ]
    })

    command.get(Program).exitOverride(exitOverride)
  })

  describe('--preid <id>', () => {
    let args: ['bump', ReleaseVersion]
    let preid: string

    beforeAll(() => {
      args = ['bump', ReleaseType.PREMAJOR]
      preid = 'beta'
    })

    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, `--preid=${preid}`])

      // Expect
      expect(bump).toHaveBeenCalledOnce()
      expect(bump.mock.lastCall?.[0]).to.have.property('preid', preid)
    })
  })

  describe('--prestart <start>', () => {
    let args: ['bump', ReleaseVersion]
    let prestart: number

    beforeAll(() => {
      args = ['bump', ReleaseType.PREPATCH]
      prestart = 0
    })

    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, `--prestart=${prestart}`])

      // Expect
      expect(bump).toHaveBeenCalledOnce()
      expect(bump.mock.lastCall?.[0]).to.have.property('prestart', prestart)
    })
  })

  describe('--recommend, -r', () => {
    let args: ['bump']

    beforeAll(() => {
      args = ['bump']
    })

    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '--recommend'])

      // Expect
      expect(recommend).toHaveBeenCalledOnce()
      expect(recommend).toHaveBeenCalledWith(expect.any(Object))
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '-r'])

      // Expect
      expect(recommend).toHaveBeenCalledOnce()
      expect(recommend).toHaveBeenCalledWith(expect.any(Object))
    })
  })

  describe('--write, -w [choice]', () => {
    let args: ['bump', ReleaseVersion]

    beforeAll(() => {
      args = ['bump', ReleaseType.PREMINOR]
    })

    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '--write=0'])

      // Expect
      expect(bump).toHaveBeenCalledOnce()
      expect(bump.mock.lastCall?.[0]).to.have.property('write', false)
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '-w', 'n'])

      // Expect
      expect(bump).toHaveBeenCalledOnce()
      expect(bump.mock.lastCall?.[0]).to.have.property('write', false)
    })
  })
})
