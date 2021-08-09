declare module 'standard-version/lib/lifecycles/bump' {
  import type { IGreaseOptions as Args } from '@grease/interfaces'
  import type { SemanticVersion as Version } from '@grease/types'

  export default function (args: Args, version: Version): Promise<Version>
}
