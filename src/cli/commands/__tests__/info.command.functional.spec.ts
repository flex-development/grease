/**
 * @file Functional Tests - InfoCommand
 * @module grease/cli/commands/tests/functional/InfoCommand
 */

import GreaseService from '#src/grease.service'
import { LogLevel, LoggerOptions, LoggerService } from '#src/log'
import type { Spy } from '#tests/interfaces'
import { CliUtilityService } from '@flex-development/nest-commander'
import { CommandTestFactory } from '@flex-development/nest-commander/testing'
import { constant, type Get } from '@flex-development/tutils'
import type { TestingModule } from '@nestjs/testing'
import envinfo from 'envinfo'
import GreaseCommand from '../grease.command'
import TestSubject from '../info.command'
import type InfoCommandOpts from '../info.command.opts'

describe('functional:cli/commands/InfoCommand', () => {
  let args: [string]
  let command: TestingModule
  let run: Spy<(typeof envinfo)['run']>

  beforeAll(() => {
    args = ['info']
  })

  beforeEach(async () => {
    command = await CommandTestFactory.createTestingCommand({
      positional: false,
      providers: [
        CliUtilityService,
        GreaseCommand,
        TestSubject,
        {
          provide: GreaseService,
          useValue: {
            config: vi.fn(constant({})).mockName('GreaseService#config')
          }
        },
        {
          provide: LoggerService,
          useValue: new LoggerService(new LoggerOptions({
            level: LogLevel.SILENT
          }))
        }
      ]
    })

    run = vi
      .spyOn(envinfo, 'run')
      .mockImplementationOnce(vi.fn().mockName('envinfo.run'))
  })

  describe('--json, -j', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '--json'])

      // Expect
      expect(run.mock.lastCall?.[1]?.json).to.be.true
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '-j'])

      // Expect
      expect(run.mock.lastCall?.[1]?.json).to.be.true
    })
  })

  describe('--markdown, -m', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '--markdown'])

      // Expect
      expect(run.mock.lastCall?.[1]?.markdown).to.be.true
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '-m'])

      // Expect
      expect(run.mock.lastCall?.[1]?.markdown).to.be.true
    })
  })

  describe('--pm, -p <package-manager>', () => {
    let arg: Lowercase<Get<InfoCommandOpts, 'pm', never>>
    let pm: Get<InfoCommandOpts, 'pm', never>

    beforeAll(() => {
      arg = 'yarn'
      pm = 'Yarn'
    })

    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, `--pm=${arg}`])

      // Expect
      expect(run.mock.lastCall?.[0]?.Binaries?.[1]).to.equal(pm)
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '-p', arg])

      // Expect
      expect(run.mock.lastCall?.[0]?.Binaries?.[1]).to.equal(pm)
    })
  })
})
