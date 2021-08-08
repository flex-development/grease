declare module 'standard-version/lib/run-lifecycle-script' {
  import type {
    IGreaseOptions as Args,
    IGreaseScripts as Scripts
  } from '@grease/interfaces'

  export default function (args: Args, hook: keyof Scripts): string | undefined
}
