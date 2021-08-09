declare module 'standard-version/defaults' {
  import type { GreaseOptionsDefaults } from '@grease/interfaces'

  const defaults: Omit<
    GreaseOptionsDefaults,
    'notesType' | 'releaseDraft' | 'releaseTarget'
  >

  export default defaults
}
