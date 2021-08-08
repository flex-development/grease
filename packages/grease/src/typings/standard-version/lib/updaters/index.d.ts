declare module 'standard-version/lib/updaters' {
  import type { Updater, UpdaterResolver } from '@grease/types'

  export default function (arg: UpdaterResolver | string): Updater | false
}
