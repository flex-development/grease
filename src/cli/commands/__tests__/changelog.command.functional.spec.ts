/**
 * @file Functional Tests - ChangelogCommand
 * @module grease/cli/commands/tests/functional/ChangelogCommand
 */

import to from '#fixtures/git/grease/sha'
import GreaseService from '#src/grease.service'
import type { Mock } from '#tests/interfaces'
import { CliUtilityService } from '@flex-development/nest-commander'
import { CommandTestFactory } from '@flex-development/nest-commander/testing'
import type { TestingModule } from '@nestjs/testing'
import TestSubject from '../changelog.command'

describe('functional:cli/commands/ChangelogCommand', () => {
  let args: ['changelog']
  let changelog: Mock<GreaseService['changelog']>
  let command: TestingModule

  beforeAll(() => {
    args = ['changelog']
  })

  beforeEach(async () => {
    command = await CommandTestFactory.createTestingCommand({
      providers: [
        CliUtilityService,
        TestSubject,
        {
          provide: GreaseService,
          useValue: {
            changelog: changelog = vi.fn().mockName('GreaseService#changelog')
          }
        }
      ]
    })

    vi.stubEnv('GREASE_CONFIG', '0')
  })

  describe('--infile, -i <path>', () => {
    let infile: string

    beforeAll(() => {
      infile = 'CHANGELOG.md'
    })

    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, `--infile=${infile}`])

      // Expect
      expect(changelog).toHaveBeenCalledOnce()
      expect(changelog.mock.lastCall?.[0]).toMatchObject({ infile })
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '-i', infile])

      // Expect
      expect(changelog).toHaveBeenCalledOnce()
      expect(changelog.mock.lastCall?.[0]).toMatchObject({ infile })
    })
  })

  describe('--outfile, -o <outfile>', () => {
    let outfile: string

    beforeAll(() => {
      outfile = 'CHANGELOG.md'
    })

    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, `--outfile=${outfile}`])

      // Expect
      expect(changelog).toHaveBeenCalledOnce()
      expect(changelog.mock.lastCall?.[0]).toMatchObject({ outfile })
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '-o', outfile])

      // Expect
      expect(changelog).toHaveBeenCalledOnce()
      expect(changelog.mock.lastCall?.[0]).toMatchObject({ outfile })
    })
  })

  describe('--releases, -r <count>', () => {
    let releases: number

    beforeAll(() => {
      releases = 0
    })

    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, `--releases=${releases}`])

      // Expect
      expect(changelog).toHaveBeenCalledOnce()
      expect(changelog.mock.lastCall?.[0]).toMatchObject({ releases })
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '-r', `${releases}`])

      // Expect
      expect(changelog).toHaveBeenCalledOnce()
      expect(changelog.mock.lastCall?.[0]).toMatchObject({ releases })
    })
  })

  describe('--samefile, -s', () => {
    let samefile: boolean

    beforeAll(() => {
      samefile = true
    })

    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '--samefile'])

      // Expect
      expect(changelog).toHaveBeenCalledOnce()
      expect(changelog.mock.lastCall?.[0]).toMatchObject({ samefile })
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '-s'])

      // Expect
      expect(changelog).toHaveBeenCalledOnce()
      expect(changelog.mock.lastCall?.[0]).toMatchObject({ samefile })
    })
  })

  describe('--to, -t <commitish>', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, `--to=${to}`])

      // Expect
      expect(changelog).toHaveBeenCalledOnce()
      expect(changelog.mock.lastCall?.[0]).toMatchObject({ to })
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '-t', to])

      // Expect
      expect(changelog).toHaveBeenCalledOnce()
      expect(changelog.mock.lastCall?.[0]).toMatchObject({ to })
    })
  })

  describe('--write, -w', () => {
    let write: boolean

    beforeAll(() => {
      write = true
    })

    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '--write'])

      // Expect
      expect(changelog).toHaveBeenCalledOnce()
      expect(changelog.mock.lastCall?.[0]).toMatchObject({ write })
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '-w'])

      // Expect
      expect(changelog).toHaveBeenCalledOnce()
      expect(changelog.mock.lastCall?.[0]).toMatchObject({ write })
    })
  })
})
