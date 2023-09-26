/**
 * @file Functional Tests - LoggerService
 * @module grease/providers/tests/functional/LoggerService
 */

import { LogLevel } from '#src/enums'
import type { Mock } from '#tests/interfaces'
import { trim, type EmptyString, type Fn } from '@flex-development/tutils'
import type { Suite } from 'vitest'
import TestSubject from '../logger.service'

describe('functional:providers/LoggerService', () => {
  let message: string
  let subject: TestSubject

  beforeAll((ctx: Readonly<Suite>) => {
    message = ctx.name
    subject = new TestSubject()
    subject.level = LogLevel.VERBOSE
  })

  describe.each<[
    | Exclude<Lowercase<keyof typeof LogLevel>, 'silent'>
    | 'ready'
    | 'start'
    | 'success',
    (EmptyString | 'level')?
  ]>([
    ['debug', 'level'],
    ['error', 'level'],
    ['fatal', 'level'],
    ['info', 'level'],
    ['log', 'level'],
    ['ready'],
    ['start'],
    ['success'],
    ['trace', 'level'],
    ['verbose', 'level'],
    ['warn', 'level']
  ])('#%s', (method, level = '') => {
    let fn: Mock<Fn<[any, ...unknown[]], void>>

    beforeAll(() => {
      fn = vi.fn().mockName('consola.' + method)
    })

    beforeEach(() => {
      // @ts-expect-error ts(2445)
      vi.spyOn(subject.consola, method).mockImplementationOnce(fn)
    })

    it(`should write ${trim(`${method} ${level}`)} log`, () => {
      // Act
      subject[method](message)

      // Expect
      expect(fn).toHaveBeenCalledOnce()
      expect(fn).toHaveBeenCalledWith(message)
    })
  })
})
