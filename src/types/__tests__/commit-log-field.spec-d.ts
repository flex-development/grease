/**
 * @file Type Tests - CommitLogField
 * @module grease/types/tests/unit-d/CommitLogField
 */

import type TestSubject from '../commit-log-field'

describe('unit-d:types/CommitLogField', () => {
  it('should extract "author.email"', () => {
    expectTypeOf<TestSubject>().extract<'author.email'>().not.toBeNever()
  })

  it('should extract "author.name"', () => {
    expectTypeOf<TestSubject>().extract<'author.name'>().not.toBeNever()
  })

  it('should extract "body"', () => {
    expectTypeOf<TestSubject>().extract<'body'>().not.toBeNever()
  })

  it('should extract "date"', () => {
    expectTypeOf<TestSubject>().extract<'date'>().not.toBeNever()
  })

  it('should extract "hash"', () => {
    expectTypeOf<TestSubject>().extract<'hash'>().not.toBeNever()
  })

  it('should extract "sha"', () => {
    expectTypeOf<TestSubject>().extract<'sha'>().not.toBeNever()
  })

  it('should extract "tags"', () => {
    expectTypeOf<TestSubject>().extract<'tags'>().not.toBeNever()
  })

  it('should extract "trailers"', () => {
    expectTypeOf<TestSubject>().extract<'trailers'>().not.toBeNever()
  })
})
