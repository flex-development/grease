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
import type { CommanderError } from '@flex-development/nest-commander/commander'
import { CommandTestFactory } from '@flex-development/nest-commander/testing'
import type { EmptyArray, Fn } from '@flex-development/tutils'
import type { TestingModule } from '@nestjs/testing'
import consola from 'consola'
import { pathToFileURL } from 'node:url'
import TestSubject from '../bump.command'

describe('functional:cli/commands/BumpCommand', () => {
  let bump: Mock<BumpService['bump']>
  let command: TestingModule
  let exitOverride: Mock<Fn<[CommanderError]>>
  let recommend: Mock<BumpService['recommend']>

  beforeAll(() => {
    consola.mockTypes(() => vi.fn())
    bump = vi.fn<Parameters<BumpService['bump']>>().mockName('BumpService#bump')
    recommend = vi.fn<EmptyArray>(() => ({})).mockName('BumpService#recommend')
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
          provide: BumpService,
          useValue: { bump, recommend }
        }
      ]
    })

    // @ts-expect-error ts(2445)
    command.get(CommandRunnerService).program.exitOverride(exitOverride)
  })

  describe('--colors, -c [choice]', () => {
    let args: ['bump', '--recommend']

    beforeAll(() => {
      args = ['bump', '--recommend']
    })

    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '--colors'])

      // Expect
      expect(consola.options.formatOptions).to.have.property('colors', true)
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '-c', '0'])

      // Expect
      expect(consola.options.formatOptions).to.have.property('colors', false)
    })
  })

  describe('--manifest, -m <id>', () => {
    let args: ['bump', ReleaseVersion]
    let manifest: string

    beforeAll(() => {
      args = ['bump', ReleaseType.PREMINOR]
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
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '-r'])

      // Expect
      expect(recommend).toHaveBeenCalledOnce()
    })
  })

  describe('--tagprefix, -t <prefix>', () => {
    let args: ['bump', '--recommend']
    let prefix: string

    beforeAll(() => {
      args = ['bump', '--recommend']
      prefix = 'grease@'
    })

    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, `--tagprefix=${prefix}`])

      // Expect
      expect(recommend).toHaveBeenCalledOnce()
      expect(recommend.mock.lastCall?.[0]).to.have.property('tagprefix', prefix)
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '-t', prefix])

      // Expect
      expect(recommend).toHaveBeenCalledOnce()
      expect(recommend.mock.lastCall?.[0]).to.have.property('tagprefix', prefix)
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
