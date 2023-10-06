/**
 * @file Functional Tests - ConfigService
 * @module grease/config/providers/tests/functional/ConfigService
 */

import type { IGreaseConfig } from '#src/config/interfaces'
import { GreaseConfig } from '#src/config/models'
import { LoggerService, ValidationService } from '#src/providers'
import * as pathe from '@flex-development/pathe'
import { DOT, cast, type Assign, type Fn } from '@flex-development/tutils'
import { Test } from '@nestjs/testing'
import TestSubject from '../config.service'

describe('functional:config/providers/ConfigService', () => {
  let subject: TestSubject

  beforeAll(async () => {
    expect.addSnapshotSerializer({
      /**
       * Get a `value` snapshot.
       *
       * @param {unknown} value - Value to print
       * @param {Fn<[unknown], string>} printer - Print function
       * @return {string} `value` as printable string
       */
      print(value: unknown, printer: Fn<[unknown], string>): string {
        const { cwd, ...rest } = cast<GreaseConfig>(value)
        return printer({ ...rest, cwd: '~' + cwd.replace(process.cwd(), '') })
      },
      /**
       * Check if `value` is a {@linkcode GreaseConfig} object.
       *
       * @param {unknown} value - Value to check
       * @return {value is GreaseConfig} `true` if `value` is config object
       */
      test(value: unknown): value is GreaseConfig {
        return value instanceof GreaseConfig
      }
    })

    subject = (await Test.createTestingModule({
      providers: [LoggerService, TestSubject, ValidationService]
    }).compile()).get(TestSubject)
  })

  describe('#load', () => {
    describe.each<[pathe.Ext, string, Assign<IGreaseConfig, { cwd: string }>]>([
      ['.js', '.grease', { cwd: '__fixtures__/pkg/major' }],
      ['.json', '.greaserc', { cwd: '__fixtures__/pkg/minor' }],
      ['.json5', 'grease.config', { cwd: '__fixtures__/pkg/patch' }],
      ['.jsonc', '.grease', { cwd: '__fixtures__/pkg/premajor' }],
      ['.mjs', '.greaserc', { cwd: '__fixtures__/pkg/preminor' }],
      ['.mts', 'grease.config', { cwd: '__fixtures__/pkg/prepatch' }],
      ['.ts', '.grease', { cwd: '__fixtures__/pkg/prerelease' }]
    ])('%s', (ext, name, opts) => {
      let file: string

      beforeAll(() => {
        file = pathe.format({ dir: opts.cwd, ext, name })
      })

      it('should load configuration object', async () => {
        expect(await subject.load(file, opts)).toMatchSnapshot()
      })
    })
  })

  describe('#search', () => {
    describe.each<['.grease' | '.greaserc' | 'grease.config', IGreaseConfig?]>([
      ['.grease', { cwd: '__fixtures__/pkg/premajor' }],
      ['.greaserc', { cwd: '__fixtures__/pkg/preminor' }],
      ['grease.config']
    ])('%s', (name, opts) => {
      let cwd: string

      beforeAll(() => {
        cwd = pathe.resolve(opts?.cwd ?? DOT)
      })

      it('should find config file', async () => {
        expect(await subject.search(opts)).to.have.property('cwd', cwd)
      })
    })
  })
})
