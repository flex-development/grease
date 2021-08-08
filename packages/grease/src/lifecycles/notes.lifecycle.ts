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
import CreateNotesDTO from '@grease/dtos/create-notes.dto'
import { NotesType } from '@grease/enums/notes-type.enum'
import GreaseOptions from '@grease/models/grease-options.model'
import type { PathLike, SemanticVersion } from '@grease/types'
import changelogVersions from '@grease/utils/changelog-versions.util'
import validate from '@grease/utils/validate.util'
import ch from 'chalk'
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
 * - any configuration options are invalid
 * - no package versions are found in the changelog content
 * - package version (`dto.version`) is not in the changelog content
 *
 * @async
 * @param {GreaseOptions} [options={}] - Application options
 * @param {CreateNotesDTO} [dto] - Generator configuration options
 * @param {PathLike} [dto.changelog] - Path to latest `CHANGELOG`
 * @param {NotesType} [dto.type] - Release notes type
 * @param {SemanticVersion | string} [dto.version] - Package version
 * @return {Promise<NullishString>} Promise containing release notes or null
 * @throws {Exception}
 */
const Notes = async (
  options: GreaseOptions = {},
  dto: CreateNotesDTO = {}
): Promise<NullishString> => {
  // Skip lifecycle
  if (options.skip?.notes || dto.type === NotesType.NULL) {
    return GREASER_NOTES_NULL
  }

  // Run `prenotes` script
  runLifecycleScript(options, 'prenotes')

  // Log validation checkpoint
  logger.checkpoint('validating notes data...', [], ch.yellow('!!'))

  // Validate config
  dto = await validate(CreateNotesDTO, dto)

  // Get note generation options
  const { changelog, type = NotesType.NULL, version } = dto

  // Generate blank notes
  if (type === NotesType.BLANK) return GREASER_NOTES_BLANK

  // Generate birthday notes
  if (options.firstRelease || type === NotesType.BIRTHDAY) {
    return GREASER_NOTES_BIRTHDAY
  }

  // Log validation checkpoint
  logger.checkpoint('generating release notes...', [], ch.yellow('!!'))

  // Skip notes if no changelog path or versions config is missing
  if (!changelog || !version) return GREASER_NOTES_NULL

  // Get changelog content and versions (in descending order)
  const content = fs.readFileSync(changelog as fs.PathLike, 'utf8')
  const versions = changelogVersions(content)

  // Throw error if no versions found in changelog content
  if (!versions.length) {
    const data = { dto, errors: { changelog }, versions }
    const message = `No package versions found in ${changelog}`

    throw new Exception(ExceptionStatusCode.NOT_FOUND, message, data)
  }

  // Search for package version in changelog content
  if (!versions.includes(version)) {
    const data = { dto, errors: { version }, versions }
    const message = `${version} not found in ${changelog}`

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

  // Run `postnotes` script
  runLifecycleScript(options, 'postnotes')

  return notes
}

export default Notes
