/**
 * @file Type Tests - Commit
 * @module grease/interfaces/tests/unit-d/Commit
 */

import type { Author, BreakingChange, Trailer } from '#src/types'
import type { JsonObject, Nullable } from '@flex-development/tutils'
import type TestSubject from '../commit.interface'

describe('unit-d:interfaces/Commit', () => {
  it('should extend JsonObject', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<JsonObject>()
  })

  it('should match [author: Author]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('author').toEqualTypeOf<Author>()
  })

  it('should match [body: Nullable<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('body')
      .toEqualTypeOf<Nullable<string>>()
  })

  it('should match [breaking: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('breaking')
      .toEqualTypeOf<boolean>()
  })

  it('should match [breaking_changes: BreakingChange[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('breaking_changes')
      .toEqualTypeOf<BreakingChange[]>()
  })

  it('should match [date: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('date').toEqualTypeOf<string>()
  })

  it('should match [hash: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('hash').toEqualTypeOf<string>()
  })

  it('should match [header: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('header').toEqualTypeOf<string>()
  })

  it('should match [mentions: string[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('mentions')
      .toEqualTypeOf<string[]>()
  })

  it('should match [pr: Nullable<number>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('pr')
      .toEqualTypeOf<Nullable<number>>()
  })

  it('should match [scope: Nullable<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('scope')
      .toEqualTypeOf<Nullable<string>>()
  })

  it('should match [sha: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('sha').toEqualTypeOf<string>()
  })

  it('should match [subject: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('subject')
      .toEqualTypeOf<string>()
  })

  it('should match [tags: string[]]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('tags').toEqualTypeOf<string[]>()
  })

  it('should match [trailers: Trailer[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('trailers')
      .toEqualTypeOf<Trailer[]>()
  })

  it('should match [type: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('type').toEqualTypeOf<string>()
  })

  it('should match [version: Nullable<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('version')
      .toEqualTypeOf<Nullable<string>>()
  })
})
