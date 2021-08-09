import { NotesType } from '@grease/enums/notes-type.enum'
import type { GreaseOptionsDefaults } from '@grease/interfaces'
import merge from 'lodash/merge'
import DEFAULTS_STANDARD_VERSION from 'standard-version/defaults'

/**
 * @file Configuration - Default Options
 * @module grease/config/defaults
 */

/**
 * @property {GreaseOptionsDefaults} defaults - Default application options
 */
const defaults: GreaseOptionsDefaults = merge(DEFAULTS_STANDARD_VERSION, {
  notesType: NotesType.CHANGELOG,
  releaseDraft: true,
  releaseTarget: 'main'
})

export default defaults
