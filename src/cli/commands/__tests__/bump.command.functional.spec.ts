/**
 * @file Functional Tests - BumpCommand
 * @module grease/cli/commands/tests/functional/BumpCommand
 */

import { ReleaseType } from '#src/enums'
import GreaseService from '#src/grease.service'
import type { ReleaseVersion } from '#src/types'
import type { Mock } from '#tests/interfaces'
import { CliUtilityService } from '@flex-development/nest-commander'
import { CommandTestFactory } from '@flex-development/nest-commander/testing'
import type { TestingModule } from '@nestjs/testing'
import TestSubject from '../bump.command'

describe('functional:cli/commands/BumpCommand', () => {
  let args: ['bump', ReleaseVersion]
  let bump: Mock<GreaseService['bump']>
  let command: TestingModule
  let recommend: Mock<GreaseService['recommend']>

  afterAll(() => {
    vi.unstubAllEnvs()
  })

  beforeAll(() => {
    args = ['bump', ReleaseType.PREMAJOR]
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

    vi.stubEnv('GREASE_CONFIG', '0')
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

  describe('--recommend, -r', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [args[0], '--recommend'])

      // Expect
      expect(recommend).toHaveBeenCalledOnce()
      expect(recommend).toHaveBeenCalledWith(expect.any(Object))
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [args[0], '-r'])

      // Expect
      expect(recommend).toHaveBeenCalledOnce()
      expect(recommend).toHaveBeenCalledWith(expect.any(Object))
    })
  })

  describe('--write, -w [choice]', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '--write'])

      // Expect
      expect(bump).toHaveBeenCalledOnce()
      expect(bump.mock.lastCall?.[0]).to.have.property('write', true)
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
