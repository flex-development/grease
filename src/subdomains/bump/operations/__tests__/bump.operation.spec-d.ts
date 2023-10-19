/**
 * @file Type Tests - BumpOperation
 * @module grease/bump/operations/tests/unit-d/BumpOperation
 */

import type { BumpFile } from '#src/bump/types'
import type { GitOptions } from '#src/git'
import type { ReleaseVersion } from '#src/types'
import type TestSubject from '../bump.operation'

describe('unit-d:bump/operations/BumpOperation', () => {
  it('should extend GitOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<GitOptions>()
  })

  it('should match [files: readonly [BumpFile, ...BumpFile[]]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('files')
      .toEqualTypeOf<readonly [BumpFile, ...BumpFile[]]>()
  })

  it('should match [preid: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('preid')
      .toEqualTypeOf<string>()
  })

  it('should match [prestart: 0 | 1]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('prestart')
      .toEqualTypeOf<0 | 1>()
  })

  it('should match [release: ReleaseVersion]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('release')
      .toEqualTypeOf<ReleaseVersion>()
  })

  it('should match [write: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('write')
      .toEqualTypeOf<boolean>()
  })
})
