/**
 * @file Type Tests - AbstractManifest
 * @module grease/models/tests/unit-d/AbstractManifest
 */

import type {
  AbstractConstructor,
  ReadonlyKeys
} from '@flex-development/tutils'
import type TestSubject from '../manifest.abstract'
import type Version from '../version.model'

describe('unit-d:models/AbstractManifest', () => {
  it('should be abstract class', () => {
    expectTypeOf<typeof TestSubject>().toMatchTypeOf<AbstractConstructor<any>>()
  })

  it('should match [dir: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('dir').toEqualTypeOf<string>()
  })

  it('should match [readonly filename: string]', () => {
    expectTypeOf<ReadonlyKeys<TestSubject>>().extract<'filename'>().toBeString()
    expectTypeOf<TestSubject>()
      .toHaveProperty('filename')
      .toEqualTypeOf<string>()
  })

  it('should match [readonly file: string]', () => {
    expectTypeOf<ReadonlyKeys<TestSubject>>().extract<'file'>().toBeString()
    expectTypeOf<TestSubject>().toHaveProperty('file').toEqualTypeOf<string>()
  })

  it('should match [version: Version]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('version')
      .toEqualTypeOf<Version>()
  })

  it('should match [write(): Promise<this> | this]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('write')
      .toEqualTypeOf<() => Promise<TestSubject> | TestSubject>()
  })
})
