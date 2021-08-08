import { ExceptionStatusCode } from '@flex-development/exceptions/enums'
import Exception from '@flex-development/exceptions/exceptions/base.exception'
import type { NullishString } from '@flex-development/tutils'
import {
  GREASER_NOTES_BIRTHDAY,
  GREASER_NOTES_BLANK,
  GREASER_NOTES_NULL,
  LINE_BREAK as BR
} from '@grease/config/constants.config'
import logger from '@grease/config/logger.config'
import { NotesType } from '@grease/enums/notes-type.enum'
import GreaseOptions from '@grease/models/grease-options.model'
import type { SemanticVersion } from '@grease/types'
import changelogVersions from '@grease/utils/changelog-versions.util'
import ch from 'chalk'
import figures from 'figures'
import fs from 'fs'
import indexOf from 'lodash/indexOf'
import runLifecycleScript from 'standard-version/lib/run-lifecycle-script'

/**
 * @file Lifecycles - Notes
 * @module grease/lifecycles/Notes
 */

/**
 * Generates release notes.
 *
 * Release notes can be blank, generated from a `CHANGELOG` file, in a special
 * birthday (first release) format, or skipped altogether.
 *
 * Throws an `Exception` if:
 *
 * - no package versions are found in the changelog content
 * - `version` is not in the changelog content
 *
 * @async
 * @param {GreaseOptions} [options={}] - Application options
 * @param {SemanticVersion | NullishString} [version] - Latest package version
 * @return {Promise<NullishString>} Promise containing release notes or null
 * @throws {Exception}
 */
const Notes = async (
  options: GreaseOptions = {},
  version: SemanticVersion | NullishString = null
): Promise<NullishString> => {
  // Skip lifecycle
  if (options.skip?.notes || options.notesType === NotesType.NULL) {
    return GREASER_NOTES_NULL
  }

  // Run `prenotes` script
  runLifecycleScript(options, 'prenotes')

  // Generate blank notes
  if (options.notesType === NotesType.BLANK) return GREASER_NOTES_BLANK

  // Generate birthday notes
  if (options.firstRelease || options.notesType === NotesType.BIRTHDAY) {
    return GREASER_NOTES_BIRTHDAY
  }

  // Skip notes if no changelog path or versions config is missing
  if (!options.infile || !version) return GREASER_NOTES_NULL

  // Log validation checkpoint
  logger.checkpoint(
    'generating release notes from %s',
    [options.infile.toString()],
    ch.yellow('!!')
  )

  // Get changelog content and versions (in descending order)
  const content = fs.readFileSync(options.infile as fs.PathLike, 'utf8')
  const versions = changelogVersions(content)

  // Throw error if no versions found in changelog content
  if (!versions.length) {
    const data = { errors: { infile: options.infile }, versions }
    const message = `No package versions found in ${options.infile}`

    throw new Exception(ExceptionStatusCode.NOT_FOUND, message, data)
  }

  // Search for package version in changelog content
  if (!versions.includes(version)) {
    const data = { errors: { version }, versions }
    const message = `${version} not found in ${options.infile}`

    throw new Exception(ExceptionStatusCode.NOT_FOUND, message, data)
  }

  // Get previous version and heading
  // ! Won't get here if v1.0.0, assuming there is always a previous version
  const prev = versions[indexOf(versions, version) + 1]
  const prev_heading = prev === '1.0.0' ? `## ${prev}` : `[${prev}]`

  // Generate release notes
  let notes = content
    .substring(content.indexOf(`[${version}]`), content.indexOf(prev_heading))
    .replaceAll('###', '##')
    .replaceAll('* ', '- ')
    .replaceAll(':*-', ':**')

  // Format release notes
  notes = notes.substring(notes.indexOf(BR), notes.lastIndexOf(BR)).trim()

  // Log notes checkpoint if dry run is enabled
  if (options.dryRun) logger.checkpoint(notes, [], ch.blue(figures.info))

  // Run `postnotes` script
  runLifecycleScript(options, 'postnotes')

  return notes
}

export default Notes
