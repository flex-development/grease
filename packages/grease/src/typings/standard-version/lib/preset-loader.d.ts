declare module 'standard-version/lib/preset-loader' {
  import type { IGreaseOptions as Args } from '@grease/interfaces'
  import type { Preset } from '@grease/types'

  export default function (args: Args): Preset
}
