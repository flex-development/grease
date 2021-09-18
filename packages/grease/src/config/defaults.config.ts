import DEFAULTS_DTAG from '@flex-development/dtag/config/defaults.config'
import { NotesType } from '@grease/enums/notes-type.enum'
import type { GreaseOptionsDefaults } from '@grease/interfaces'
import merge from 'lodash.merge'
import DEFAULTS_STANDARD_VERSION from 'standard-version/defaults'

/**
 * @file Configuration - Default Options
 * @module grease/config/defaults
 */

/**
 * @property {GreaseOptionsDefaults} defaults - Default application options
 */
const defaults: GreaseOptionsDefaults = merge(DEFAULTS_STANDARD_VERSION, {
  gitdir: process.env.PROJECT_CWD as string,
  notesType: NotesType.CHANGELOG,
  prereleaseDelimiter: DEFAULTS_DTAG.delimiter,
  prereleaseMap: new Map(Object.entries(DEFAULTS_DTAG.map)),
  releaseDraft: true,
  releaseTarget: 'main'
})

export default defaults
