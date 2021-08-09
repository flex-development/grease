declare module 'standard-version/lib/checkpoint' {
  import type { IGreaseOptions as Argv } from '@grease/interfaces'

  export default function (
    argv: Argv,
    msg: string,
    args: any[],
    figure?: string
  ): void
}
