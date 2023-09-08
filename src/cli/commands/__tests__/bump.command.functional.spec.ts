/**
 * @file Functional Tests - BumpCommand
 * @module grease/cli/commands/tests/functional/BumpCommand
 */

import { ReleaseType } from '#src/enums'
import { BumpService } from '#src/providers'
import type { ReleaseVersion } from '#src/types'
import type { Mock } from '#tests/interfaces'
import {
  CliUtilityService,
  CommandRunnerService
} from '@flex-development/nest-commander'
import { CommandTestFactory } from '@flex-development/nest-commander/testing'
import type { TestingModule } from '@nestjs/testing'
import { pathToFileURL } from 'node:url'
import TestSubject from '../bump.command'

describe('functional:cli/commands/BumpCommand', () => {
  let args: ['bump', ReleaseVersion, ...string[]]
  let bump: Mock<BumpService['bump']>
  let command: TestingModule

  beforeAll(() => {
    args = ['bump', ReleaseType.PREMINOR]
    bump = vi.fn<Parameters<BumpService['bump']>>().mockName('BumpService#bump')
  })

  beforeEach(async () => {
    command = await CommandTestFactory.createTestingCommand({
      providers: [
        CliUtilityService,
        TestSubject,
        {
          provide: BumpService,
          useValue: { bump }
        }
      ]
    })

    // @ts-expect-error ts(2445)
    command.get(CommandRunnerService).program.exitOverride(e => {
      throw e
    })
  })

  describe('--manifest, -m <id>', () => {
    let manifest: string

    beforeAll(() => {
      manifest = pathToFileURL('__fixtures__/pkg/major').href
    })

    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, `--manifest=${manifest}`])

      // Expect
      expect(bump).toHaveBeenCalledOnce()
      expect(bump.mock.lastCall?.[0]).to.have.property('manifest', manifest)
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '-m', manifest])

      // Expect
      expect(bump).toHaveBeenCalledOnce()
      expect(bump.mock.lastCall?.[0]).to.have.property('manifest', manifest)
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
    })
  })

  describe('--silent, -s', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '--silent'])

      // Expect
      expect(bump).toHaveBeenCalledOnce()
      expect(bump.mock.lastCall?.[0]).to.have.property('silent', true)
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '-s'])

      // Expect
      expect(bump).toHaveBeenCalledOnce()
      expect(bump.mock.lastCall?.[0]).to.have.property('silent', true)
    })
  })

  describe('--write, -w [choice]', () => {
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
