import cache from '@grease/config/cache.config'
import IsPath from '@grease/decorators/is-path.decorator'
import IsSemVer from '@grease/decorators/is-sem-ver.decorator'
import { NotesType } from '@grease/enums/notes-type.enum'
import type { PathLike, SemanticVersion } from '@grease/types'
import { IsEnum, IsOptional, ValidateIf } from 'class-validator'

/**
 * @file Data Transfer Objects - CreateNotesDTO
 * @module grease/dtos/CreateNotes
 */

/**
 * Data used to generate release notes.
 */
export default class CreateNotesDTO {
  /**
   * Path to `CHANGELOG` if `type` is `ReleaseNotesType.CHANGELOG`.
   */
  @ValidateIf(o => o.type === NotesType.CHANGELOG)
  @IsPath({ cwd: true, exists: true })
  changelog?: PathLike

  /**
   * Type of release notes to generate.
   *
   * @default ReleaseNotesType.NULL
   */
  @IsEnum(NotesType)
  @IsOptional()
  type?: NotesType

  /**
   * Most recently released version.
   */
  @IsSemVer({ git: cache.git })
  @ValidateIf(o => o.type === NotesType.CHANGELOG)
  version?: SemanticVersion | string
}
