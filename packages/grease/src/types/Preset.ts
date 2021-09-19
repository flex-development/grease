import type { IChangelogPreset } from '@grease/interfaces'

/**
 * @file Type Definitions - Preset
 * @module grease/types/Preset
 */

/**
 * Custom [Conventional Changelog][1] preset or name of custom preset.
 *
 * [1]: https://github.com/conventional-changelog/conventional-changelog
 */
export type Preset = IChangelogPreset | IChangelogPreset['name']
