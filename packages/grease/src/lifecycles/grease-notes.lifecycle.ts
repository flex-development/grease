import { ExceptionStatusCode } from '@flex-development/exceptions/enums'
import Exception from '@flex-development/exceptions/exceptions/base.exception'
import type { NullishString } from '@flex-development/tutils'
import {
  GREASER_NOTES_BIRTHDAY,
  GREASER_NOTES_BLANK,
  GREASER_NOTES_NULL,
  LINE_BREAK as BR
} from '@grease/config/constants.config'
import CreateGreaseNotesDTO from '@grease/dtos/create-grease-notes.dto'
import { GreaseNotesType as GNT } from '@grease/enums/grease-notes-type.enum'
import type { PathLike, SemanticVersion } from '@grease/types'
import changelogVersions from '@grease/utils/changelog-versions.util'
import validate from '@grease/utils/validate.util'
import fs from 'fs'
import indexOf from 'lodash/indexOf'

/**
 * @file Lifecycles - Grease Notes
 * @module grease/lifecycles/GreaseNotes
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
 * @param {CreateGreaseNotesDTO} [dto] - Generator configuration options
 * @param {PathLike} [dto.changelog] - Path to latest `CHANGELOG`
 * @param {GNT} [dto.type] - Release notes type
 * @param {SemanticVersion | string} [dto.version] - Package version
 * @return {Promise<NullishString>} Promise containing release notes or null
 * @throws {Exception}
 */
const GreaseNotes = async (
  dto: CreateGreaseNotesDTO = {}
): Promise<NullishString> => {
  // Validate config
  dto = await validate(CreateGreaseNotesDTO, dto)

  // Get note generation options
  const { changelog, type = GNT.NULL, version } = dto

  // Generate blank notes
  if (type === GNT.BLANK) return GREASER_NOTES_BLANK

  // Generate birthday notes
  if (type === GNT.BIRTHDAY || version === '1' || version === '1.0.0') {
    return GREASER_NOTES_BIRTHDAY
  }

  // Skip note generation
  if (type === GNT.NULL) return GREASER_NOTES_NULL

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
  const notes = content
    .substring(content.indexOf(`[${version}]`), content.indexOf(prev_heading))
    .replaceAll('###', '##')
    .replaceAll('* ', '- ')
    .replaceAll(':*-', ':**')

  return notes.substring(notes.indexOf(BR), notes.lastIndexOf(BR)).trim()
}

export default GreaseNotes