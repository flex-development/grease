declare module 'standard-version/lib/latest-semver-tag' {
  import type { SemanticVersion } from '@grease/types'

  export default function (tagPrefix?: string): Promise<SemanticVersion>
}
