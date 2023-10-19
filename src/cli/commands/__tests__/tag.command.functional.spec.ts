/**
 * @file Functional Tests - TagCommand
 * @module grease/cli/commands/tests/functional/TagCommand
 */

import sha from '#fixtures/git/grease/sha'
import pkg from '#pkg'
import { TagOperation } from '#src/git'
import GreaseService from '#src/grease.service'
import { LogObject, LoggerService } from '#src/log'
import { Version } from '#src/models'
import type { Mock } from '#tests/interfaces'
import { CliUtilityService } from '@flex-development/nest-commander'
import { CommandTestFactory } from '@flex-development/nest-commander/testing'
import { join } from '@flex-development/tutils'
import type { TestingModule } from '@nestjs/testing'
import GreaseCommand from '../grease.command'
import TestSubject from '../tag.command'

describe('functional:cli/commands/TagCommand', () => {
  let args: ['tag', string]
  let command: TestingModule
  let log: Mock<LoggerService['log']>
  let success: Mock<LoggerService['success']>
  let tag: Mock<GreaseService['tag']>
  let tags: Mock<GreaseService['tags']>

  beforeAll(() => {
    args = ['tag', faker.system.semver()]
  })

  beforeEach(async () => {
    command = await CommandTestFactory.createTestingCommand({
      positional: false,
      providers: [
        CliUtilityService,
        GreaseCommand,
        LoggerService,
        TestSubject,
        {
          provide: GreaseService,
          useValue: {
            config: vi
              .fn()
              .mockReturnValue({})
              .mockName('GreaseService#config'),
            tag: tag = vi
              .fn()
              .mockReturnValue(new TagOperation({
                tag: args[1],
                verify: false
              }))
              .mockName('GreaseService#tag'),
            tags: tags = vi
              .fn()
              .mockReturnValue([`${new Version(args[1]).major - 1}.0.0`])
              .mockName('GreaseService#tags')
          }
        },
        {
          provide: LoggerService,
          useValue: {
            log: log = vi.fn().mockName('LoggerService#log'),
            success: success = vi.fn().mockName('LoggerService#success'),
            withTag: vi.fn().mockReturnValue({
              log,
              success,
              sync: vi.fn().mockName('LoggerService#sync')
            })
          }
        }
      ]
    })
  })

  describe('--force, -f', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '--force'])

      // Expect
      expect(tag).toHaveBeenCalledOnce()
      expect(tag.mock.lastCall?.[0]).to.have.property('force').be.true
      expect(success).toHaveBeenCalledOnce()
      expect(success).toHaveBeenCalledWith(args[1])
      expect(tags).not.toBeCalled()
      expect(log).not.toBeCalled()
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '-f'])

      // Expect
      expect(tag).toHaveBeenCalledOnce()
      expect(tag.mock.lastCall?.[0]).to.have.property('force').be.true
      expect(success).toHaveBeenCalledOnce()
      expect(success).toHaveBeenCalledWith(args[1])
      expect(tags).not.toBeCalled()
      expect(log).not.toBeCalled()
    })
  })

  describe('--json, -j', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '--json'])

      // Expect
      expect(tag).toHaveBeenCalledOnce()
      expect(log).toHaveBeenCalledOnce()
      expect(log).toHaveBeenCalledWith(expect.any(LogObject))
      expect(success).not.toBeCalled()
      expect(tags).not.toBeCalled()
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [args[0], '-jl'])

      // Expect
      expect(tags).toHaveBeenCalledOnce()
      expect(log).toHaveBeenCalledOnce()
      expect(log).toHaveBeenCalledWith(expect.any(LogObject))
      expect(success).not.toBeCalled()
      expect(tag).not.toBeCalled()
    })
  })

  describe('--list, -l', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [args[0], '--list'])

      // Expect
      expect(tags).toHaveBeenCalledOnce()
      expect(tags).toHaveBeenCalledWith(expect.any(Object))
      expect(log).toHaveBeenCalledOnce()
      expect(log).toHaveBeenCalledWith(expect.any(String))
      expect(tag).not.toBeCalled()
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [args[0], '-l'])

      // Expect
      expect(tags).toHaveBeenCalledOnce()
      expect(tags).toHaveBeenCalledWith(expect.any(Object))
      expect(log).toHaveBeenCalledOnce()
      expect(log).toHaveBeenCalledWith(expect.any(String))
      expect(tag).not.toBeCalled()
    })
  })

  describe('--message, -m <msg>', () => {
    let message: string

    beforeAll(() => {
      message = `release ${args[1]}`
    })

    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, `--message=${message}`])

      // Expect
      expect(tag).toHaveBeenCalledOnce()
      expect(tag.mock.lastCall?.[0]).to.have.property('message', message)
      expect(success).toHaveBeenCalledOnce()
      expect(success).toHaveBeenCalledWith(args[1])
      expect(tags).not.toBeCalled()
      expect(log).not.toBeCalled()
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '-m', message])

      // Expect
      expect(tag).toHaveBeenCalledOnce()
      expect(tag.mock.lastCall?.[0]).to.have.property('message', message)
      expect(success).toHaveBeenCalledOnce()
      expect(success).toHaveBeenCalledWith(args[1])
      expect(tags).not.toBeCalled()
      expect(log).not.toBeCalled()
    })
  })

  describe('--object, -o <commitish>', () => {
    let object: string

    beforeAll(() => {
      object = sha
    })

    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, `--object=${object}`])

      // Expect
      expect(tag).toHaveBeenCalledOnce()
      expect(tag.mock.lastCall?.[0]).to.have.property('object', object)
      expect(success).toHaveBeenCalledOnce()
      expect(success).toHaveBeenCalledWith(args[1])
      expect(tags).not.toBeCalled()
      expect(log).not.toBeCalled()
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '-o', object])

      // Expect
      expect(tag).toHaveBeenCalledOnce()
      expect(tag.mock.lastCall?.[0]).to.have.property('object', object)
      expect(success).toHaveBeenCalledOnce()
      expect(success).toHaveBeenCalledWith(args[1])
      expect(tags).not.toBeCalled()
      expect(log).not.toBeCalled()
    })
  })

  describe('--push, -p', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '--push'])

      // Expect
      expect(tag).toHaveBeenCalledOnce()
      expect(tag.mock.lastCall?.[0]).to.have.property('push').be.true
      expect(success).toHaveBeenCalledOnce()
      expect(success).toHaveBeenCalledWith(args[1])
      expect(tags).not.toBeCalled()
      expect(log).not.toBeCalled()
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '-p'])

      // Expect
      expect(tag).toHaveBeenCalledOnce()
      expect(tag.mock.lastCall?.[0]).to.have.property('push').be.true
      expect(success).toHaveBeenCalledOnce()
      expect(success).toHaveBeenCalledWith(args[1])
      expect(tags).not.toBeCalled()
      expect(log).not.toBeCalled()
    })
  })

  describe('--remote, -r <dest>', () => {
    let remote: string

    beforeAll(() => {
      remote = pkg.repository
    })

    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, `--remote=${remote}`])

      // Expect
      expect(tag).toHaveBeenCalledOnce()
      expect(tag.mock.lastCall?.[0]).to.have.property('remote', remote)
      expect(success).toHaveBeenCalledOnce()
      expect(success).toHaveBeenCalledWith(args[1])
      expect(tags).not.toBeCalled()
      expect(log).not.toBeCalled()
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '-r', remote])

      // Expect
      expect(tag).toHaveBeenCalledOnce()
      expect(tag.mock.lastCall?.[0]).to.have.property('remote', remote)
      expect(success).toHaveBeenCalledOnce()
      expect(success).toHaveBeenCalledWith(args[1])
      expect(tags).not.toBeCalled()
      expect(log).not.toBeCalled()
    })
  })

  describe('--sign, -s [opt]', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '--sign'])

      // Expect
      expect(tag).toHaveBeenCalledOnce()
      expect(tag.mock.lastCall?.[0]).to.have.property('sign').be.true
      expect(success).toHaveBeenCalledOnce()
      expect(success).toHaveBeenCalledWith(args[1])
      expect(tags).not.toBeCalled()
      expect(log).not.toBeCalled()
    })

    it('should parse short flag', async () => {
      // Arrange
      const sign: string = faker.string.nanoid()

      // Act
      await CommandTestFactory.run(command, [...args, '-s', sign])

      // Expect
      expect(tag).toHaveBeenCalledOnce()
      expect(tag.mock.lastCall?.[0]).to.have.property('sign', sign)
      expect(success).toHaveBeenCalledOnce()
      expect(success).toHaveBeenCalledWith(args[1])
      expect(tags).not.toBeCalled()
      expect(log).not.toBeCalled()
    })
  })

  describe('--sort <list>', () => {
    let sort: string[]

    beforeAll(() => {
      sort = ['-creatordate', 'v:refname']
    })

    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, `--sort=${join(sort)}`])

      // Expect
      expect(tags).toHaveBeenCalledOnce()
      expect(tags.mock.lastCall?.[0]).to.have.deep.property('sort', sort)
      expect(log).toHaveBeenCalledOnce()
      expect(log).toHaveBeenCalledWith(expect.any(String))
      expect(tag).not.toBeCalled()
    })
  })

  describe('--unstable, -u [choice]', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [args[0], '--list', '--unstable'])

      // Expect
      expect(tags).toHaveBeenCalledOnce()
      expect(tags.mock.lastCall?.[0]).to.have.property('unstable').be.true
      expect(log).toHaveBeenCalledOnce()
      expect(log).toHaveBeenCalledWith(expect.any(String))
      expect(tag).not.toBeCalled()
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [args[0], '-l', '-u', '0'])

      // Expect
      expect(tags).toHaveBeenCalledOnce()
      expect(tags.mock.lastCall?.[0]).to.have.property('unstable').be.false
      expect(log).toHaveBeenCalledOnce()
      expect(log).toHaveBeenCalledWith(expect.any(String))
      expect(tag).not.toBeCalled()
    })
  })

  describe('--verify, -V [choice]', () => {
    it('should parse flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '--verify'])

      // Expect
      expect(tag).toHaveBeenCalledOnce()
      expect(tag.mock.lastCall?.[0]).to.have.property('verify').be.true
      expect(success).toHaveBeenCalledOnce()
      expect(success).toHaveBeenCalledWith(args[1])
      expect(tags).not.toBeCalled()
      expect(log).not.toBeCalled()
    })

    it('should parse short flag', async () => {
      // Act
      await CommandTestFactory.run(command, [...args, '-V', '0'])

      // Expect
      expect(tag).toHaveBeenCalledOnce()
      expect(tag.mock.lastCall?.[0]).to.have.property('verify').be.false
      expect(success).toHaveBeenCalledOnce()
      expect(success).toHaveBeenCalledWith(args[1])
      expect(tags).not.toBeCalled()
      expect(log).not.toBeCalled()
    })
  })
})
