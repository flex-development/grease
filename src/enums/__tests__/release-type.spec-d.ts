/**
 * @file Type Tests - ReleaseType
 * @module grease/enums/tests/unit-d/ReleaseType
 */

import type TestSubject from '../release-type'

describe('unit-d:enums/ReleaseType', () => {
  it('should match [MAJOR = "major"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('MAJOR')
      .toMatchTypeOf<'major'>()
  })

  it('should match [MINOR = "minor"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('MINOR')
      .toMatchTypeOf<'minor'>()
  })

  it('should match [PATCH = "patch"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('PATCH')
      .toMatchTypeOf<'patch'>()
  })

  it('should match [PREMAJOR = "premajor"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('PREMAJOR')
      .toMatchTypeOf<'premajor'>()
  })

  it('should match [PREMINOR = "preminor"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('PREMINOR')
      .toMatchTypeOf<'preminor'>()
  })

  it('should match [PREPATCH = "prepatch"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('PREPATCH')
      .toMatchTypeOf<'prepatch'>()
  })

  it('should match [PRERELEASE = "prerelease"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('PRERELEASE')
      .toMatchTypeOf<'prerelease'>()
  })
})
