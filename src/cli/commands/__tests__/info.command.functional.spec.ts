/**
 * @file Functional Tests - InfoCommand
 * @module grease/cli/commands/tests/functional/InfoCommand
 */

import GreaseModule from '#src/grease.module'
import type { Spy } from '#tests/interfaces'
import { CliUtilityService } from '@flex-development/nest-commander'
import { CommandTestFactory } from '@flex-development/nest-commander/testing'
import type { TestingModule } from '@nestjs/testing'
import envinfo from 'envinfo'
import TestSubject from '../info.command'

describe('functional:cli/commands/InfoCommand', () => {
  let args: [string]
  let command: TestingModule
  let run: Spy<(typeof envinfo)['run']>

  beforeAll(() => {
    args = ['info']
  })

  beforeEach(async () => {
    command = await CommandTestFactory.createTestingCommand({
      imports: [GreaseModule],
      providers: [CliUtilityService, TestSubject]
    })

    run = vi
      .spyOn(envinfo, 'run')
      .mockImplementationOnce(vi.fn().mockName('envinfo.run'))
  })

  it('should run successfully with defaults', async () => {
    // Act
    await CommandTestFactory.run(command, args)

    // Expect
    expect(run.mock.lastCall?.[1]?.json).to.be.true
    expect(run.mock.lastCall?.[1]?.markdown).to.be.false
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

  describe('--yaml, -y', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '--yaml'])

      // Expect
      expect(run.mock.lastCall?.[1]?.json).to.be.false
      expect(run.mock.lastCall?.[1]?.markdown).to.be.false
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '-y'])

      // Expect
      expect(run.mock.lastCall?.[1]?.json).to.be.false
      expect(run.mock.lastCall?.[1]?.markdown).to.be.false
    })
  })
})
