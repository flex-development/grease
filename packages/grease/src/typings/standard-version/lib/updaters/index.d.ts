declare module 'standard-version/lib/updaters' {
  import type { Updater, UpdaterResolver } from '@grease/types'

  export const resolveUpdaterObjectFromArgument: (
    arg: UpdaterResolver | string
  ) => Updater | false
}
