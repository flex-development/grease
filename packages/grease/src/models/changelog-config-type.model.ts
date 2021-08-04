import { IsBoolean, IsOptional, IsString } from 'class-validator'
import type { Config } from 'conventional-changelog-config-spec'

/**
 * @file Data Models - ChangelogConfigType
 * @module grease/models/ChangelogConfigType
 */

/**
 * Data model that describes a commit type's settings in a `CHANGELOG` file.
 *
 * @see https://github.com/conventional-changelog/conventional-changelog
 *
 * @class
 * @implements {Config.Type.Base}
 */
export default class ChangelogConfigType implements Config.Type.Base {
  @IsBoolean()
  @IsOptional()
  hidden?: Config.Type.Base['hidden']

  @IsString()
  @IsOptional()
  section?: Config.Type.Base['section']

  @IsString()
  type: Config.Type.Base['type']
}
