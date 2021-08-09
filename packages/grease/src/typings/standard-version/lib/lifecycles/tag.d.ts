declare module 'standard-version/lib/lifecycles/tag' {
  import type { IGreaseOptions as Args } from '@grease/interfaces'
  import type { SemanticVersion as Version } from '@grease/types'

  export default function (
    newVersion: Version,
    pkgPrivate: boolean,
    args: Args
  ): Promise<Version>
}
