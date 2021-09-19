declare module 'standard-version/lib/write-file' {
  import type { IGreaseOptions as Args } from '@grease/interfaces'
  import type { PathOrFileDescriptor } from 'fs'

  export default function (
    args: Args,
    filePath: PathOrFileDescriptor,
    content: string | NodeJS.ArrayBufferView
  ): void
}
