/**
 * @file Type Tests - TagOperation
 * @module grease/git/operations/tests/unit-d/TagOperation
 */

import type { GitOptions } from '#src/git/options'
import type TestSubject from '../tag.operation'

describe('unit-d:git/operations/TagOperation', () => {
  it('should extend GitOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<GitOptions>()
  })

  it('should match [force: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('force')
      .toEqualTypeOf<boolean>()
  })

  it('should match [message: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('message')
      .toEqualTypeOf<string>()
  })

  it('should match [object: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('object')
      .toEqualTypeOf<string>()
  })

  it('should match [push: boolean]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('push').toEqualTypeOf<boolean>()
  })

  it('should match [remote: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('remote')
      .toEqualTypeOf<string>()
  })

  it('should match [sign: boolean | string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('sign')
      .toEqualTypeOf<boolean | string>()
  })

  it('should match [tag: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('tag').toEqualTypeOf<string>()
  })

  it('should match [verify: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('verify')
      .toEqualTypeOf<boolean>()
  })
})
