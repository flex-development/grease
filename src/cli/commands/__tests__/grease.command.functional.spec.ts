/**
 * @file Functional Tests - GreaseCommand
 * @module grease/cli/commands/tests/functional/GreaseCommand
 */

import tagprefix from '#fixtures/git/grease/tagprefix'
import GreaseModule from '#src/grease.module'
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

  afterAll(() => {
    vi.unstubAllEnvs()
  })

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
    vi.stubEnv('GREASE_DEBUG', '0')
  })

  describe('--colors, -c [choice]', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, ['--colors'])

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

  describe('--debug, -d', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, ['--debug'])

      // Expect
      expect(exitOverride).not.toHaveBeenCalled()
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, ['-d'])

      // Expect
      expect(exitOverride).not.toHaveBeenCalled()
    })
  })

  describe('--quiet, -q', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, ['--quiet'])

      // Expect
      expect(exitOverride).not.toHaveBeenCalled()
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, ['-q'])

      // Expect
      expect(exitOverride).not.toHaveBeenCalled()
    })
  })

  describe('--tagprefix, -T <prefix>', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [`--tagprefix=${tagprefix}`])

      // Expect
      expect(exitOverride).not.toHaveBeenCalled()
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, ['-T', tagprefix])

      // Expect
      expect(exitOverride).not.toHaveBeenCalled()
    })
  })
})
