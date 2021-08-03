import type { SemanticVersion } from '@grease/types'
import { readFileSync } from 'fs'
import { join } from 'path'

/**
 * @file Global Fixture - CHANGELOG content
 * @module tests/fixtures/changelog
 */

export const VERSIONS: SemanticVersion[] = [
  '5.1.0',
  '5.0.0',
  '4.0.1',
  '4.0.0',
  '3.1.1',
  '3.1.0',
  '3.0.0',
  '2.0.0',
  '1.0.0'
]

export const RELEASE_NOTES: Record<SemanticVersion, string> = {
  '2.0.0': `## ⚠ BREAKING CHANGES

- **repo:** add MangoRepository
- **repo:** dtos, interfaces, types

## :hammer: Build

- **deps:** install repo api dependencies
  ([0c73e11](https://github.com/flex-development/mango/commit/0c73e11351468c6613560ea08d66d3c97a3ddee5))

## :sparkles: Features

- **decorators:** custom decorators
  ([32c3d47](https://github.com/flex-development/mango/commit/32c3d4767e7e8db90ca1a38381db55876cbfc2bc))
- **mixins:** add MangoValidator
  ([25a5df1](https://github.com/flex-development/mango/commit/25a5df10d69cc157b94215f2d794b61fb6a97b6c))
- **repo:** add MangoRepository
  ([00bf295](https://github.com/flex-development/mango/commit/00bf2958b8a68b81b97a1a695fa6f6d97ccef868))
- **repo:** dtos, interfaces, types
  ([1d0c286](https://github.com/flex-development/mango/commit/1d0c28660da03a92509c21016c9f99ab2b73cf62))`
}

export default `${readFileSync(join(__dirname, 'CHANGELOG.fixture.md'))}`
