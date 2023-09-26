/**
 * @file Functional Tests - GreaseCommand
 * @module grease/cli/commands/tests/functional/GreaseCommand
 */

import tagprefix from '#fixtures/git/grease/tagprefix'
import type { Mock } from '#tests/interfaces'
import {
  CliUtilityService,
  Program
} from '@flex-development/nest-commander'
import {
  type CommanderError
} from '@flex-development/nest-commander/commander'
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
      providers: [CliUtilityService, TestSubject]
    })

    command.get(Program).exitOverride(exitOverride)
    vi.spyOn(Program.prototype, 'help').mockImplementationOnce(vi.fn())
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

  describe('--silent, -s', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, ['--silent'])

      // Expect
      expect(exitOverride).not.toHaveBeenCalled()
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, ['-s'])

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
