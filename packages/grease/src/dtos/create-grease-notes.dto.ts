import IsPath from '@grease/decorators/is-path.decorator'
import IsSemVer from '@grease/decorators/is-sem-ver.decorator'
import { GreaseNotesType } from '@grease/enums/grease-notes-type.enum'
import type { PathLike, SemanticVersion } from '@grease/types'
import { IsEnum, IsOptional, ValidateIf } from 'class-validator'

/**
 * @file Data Transfer Objects - CreateGreaseNotesDTO
 * @module grease/dtos/CreateGreaseNotes
 */

/**
 * `GreaserNotes` plugin configuration options.
 */
export default class CreateGreaseNotesDTO {
  /**
   * Path to `CHANGELOG` if `type` is `ReleaseNotesType.CHANGELOG`.
   */
  @ValidateIf(o => o.type === GreaseNotesType.CHANGELOG)
  @IsPath({ cwd: true, exists: true })
  changelog?: PathLike

  /**
   * Type of release notes to generate.
   *
   * @default ReleaseNotesType.NULL
   */
  @IsEnum(GreaseNotesType)
  @IsOptional()
  type?: GreaseNotesType

  /**
   * Most recently released version.
   *
   * @todo Get `git` settings from application cache
   */
  @IsSemVer({})
  @ValidateIf(o => o.type === GreaseNotesType.CHANGELOG)
  version?: SemanticVersion | string
}
