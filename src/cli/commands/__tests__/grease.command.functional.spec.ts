/**
 * @file Functional Tests - GreaseCommand
 * @module grease/cli/commands/tests/functional/GreaseCommand
 */

import gc from '#gc' assert { type: 'json' }
import GreaseModule from '#src/grease.module'
import { UserLogLevel } from '#src/log'
import type { Mock } from '#tests/interfaces'
import {
  CliUtilityService,
  Program
} from '@flex-development/nest-commander'
import type { CommanderError } from '@flex-development/nest-commander/commander'
import { CommandTestFactory } from '@flex-development/nest-commander/testing'
import pathe from '@flex-development/pathe'
import type { Fn } from '@flex-development/tutils'
import type { TestingModule } from '@nestjs/testing'
import TestSubject from '../grease.command'

describe('functional:cli/commands/GreaseCommand', () => {
  let command: TestingModule
  let exitOverride: Mock<Fn<[CommanderError]>>

  beforeAll(() => {
    exitOverride = vi.fn<[e: CommanderError]>((e: CommanderError) => {
      throw e
    })
  })

  beforeEach(async () => {
    command = await CommandTestFactory.createTestingCommand({
      imports: [GreaseModule],
      providers: [CliUtilityService, TestSubject]
    })

    command.get(Program).exitOverride(exitOverride)

    vi.spyOn(Program.prototype, 'help').mockImplementationOnce(vi.fn())
    vi.stubEnv('GREASE_CONFIG', '0')
  })

  describe('--color, -c [choice]', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, ['--color'])

      // Expect
      expect(exitOverride).not.toHaveBeenCalled()
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, ['-c', '0'])

      // Expect
      expect(exitOverride).not.toHaveBeenCalled()
    })
  })

  describe('--config, -g [opt]', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, ['--config=grease.config.json'])

      // Expect
      expect(exitOverride).not.toHaveBeenCalled()
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, ['-g'])

      // Expect
      expect(exitOverride).not.toHaveBeenCalled()
    })
  })

  describe('--cwd, -k <dir>', () => {
    let cwd: string

    beforeAll(() => {
      cwd = pathe.resolve('__fixtures__')
    })

    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [`--cwd=${cwd}`])

      // Expect
      expect(exitOverride).not.toHaveBeenCalled()
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, ['-k', cwd])

      // Expect
      expect(exitOverride).not.toHaveBeenCalled()
    })
  })

  describe('--level, -L <level>', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [`--level=${UserLogLevel.DEBUG}`])

      // Expect
      expect(exitOverride).not.toHaveBeenCalled()
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, ['-L', UserLogLevel.SILENT])

      // Expect
      expect(exitOverride).not.toHaveBeenCalled()
    })
  })

  describe('--tagprefix, -T <prefix>', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [`--tagprefix=${gc.tagprefix}`])

      // Expect
      expect(exitOverride).not.toHaveBeenCalled()
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, ['-T', gc.tagprefix])

      // Expect
      expect(exitOverride).not.toHaveBeenCalled()
    })
  })
})
