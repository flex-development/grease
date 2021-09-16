import { ExceptionStatusCode } from '@flex-development/exceptions/enums'
import Exception from '@flex-development/exceptions/exceptions/base.exception'
import { LogLevel } from '@flex-development/log/enums/log-level.enum'
import type { NullishString } from '@flex-development/tutils'
import {
  GREASER_NOTES_BIRTHDAY,
  GREASER_NOTES_BLANK,
  GREASER_NOTES_NULL,
  LINE_BREAK as BR
} from '@grease/config/constants.config'
import { NotesType } from '@grease/enums/notes-type.enum'
import type { IGreaseOptions } from '@grease/interfaces'
import type { SemanticVersion } from '@grease/types'
import changelogVersions from '@grease/utils/changelog-versions.util'
import logger from '@grease/utils/logger.util'
import ch from 'chalk'
import fs from 'fs'
import indexOf from 'lodash/indexOf'
import runLifecycleScript from 'standard-version/lib/run-lifecycle-script'

/**
 * @file Lifecycles - notes
 * @module grease/lifecycles/notes
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
 * @param {IGreaseOptions} [options={}] - Application options
 * @param {SemanticVersion | NullishString} [version] - Latest package version
 * @return {Promise<NullishString>} Promise containing release notes or null
 * @throws {Exception}
 */
const Notes = async (
  options: IGreaseOptions = {},
  version: SemanticVersion | NullishString = null
): Promise<NullishString> => {
  // Skip lifecycle
  if (options.skip?.notes || options.notesType === NotesType.NULL) {
    logger(options, 'skipping release notes', [], LogLevel.ERROR)
    return GREASER_NOTES_NULL
  }

  // Run `prenotes` script
  await runLifecycleScript(options, 'prenotes')

  // Generate blank notes
  if (options.notesType === NotesType.BLANK) {
    logger(options, 'created blank release notes')
    return GREASER_NOTES_BLANK
  }

  // Generate birthday notes
  if (options.firstRelease || options.notesType === NotesType.BIRTHDAY) {
    logger(options, 'created birthday format release notes')
    return GREASER_NOTES_BIRTHDAY
  }

  // Skip notes if no changelog is missing
  if (!options.infile || !fs.existsSync(options.infile as fs.PathLike)) {
    const args = [`${options.infile} does not exist`]

    logger(options, 'skipping release notes', args, LogLevel.ERROR)
    return GREASER_NOTES_NULL
  }

  // Skip notes if missing package version
  if (!version) {
    const args = ['package version is', version]

    logger(options, 'skipping release notes', args, LogLevel.ERROR)
    return GREASER_NOTES_NULL
  }

  // Log validation checkpoint
  logger(
    options,
    'creating release notes from %s',
    [options.infile],
    LogLevel.INFO
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

  // Log notes checkpoint
  logger(options, 'created release notes')

  // Log notes if dry run is enabled
  if (options.dryRun && !options.silent) {
    logger(options, `\n---\n${ch.gray(notes)}\n---\n`, [], LogLevel.DEBUG)
  }

  // Run `postnotes` script
  await runLifecycleScript(options, 'postnotes')

  return notes
}

export default Notes
