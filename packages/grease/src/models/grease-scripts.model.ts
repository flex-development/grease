import type { IGreaseScripts } from '@grease/interfaces'
import { IsOptional, IsString } from 'class-validator'

/**
 * @file Data Models - GreaseScripts
 * @module grease/models/GreaseScripts
 */

/**
 * `IGreaseScripts` data model.
 *
 * @class
 * @implements {IGreaseScripts}
 */
export default class GreaseScripts implements IGreaseScripts {
  @IsString()
  @IsOptional()
  postbump?: IGreaseScripts['postbump']

  @IsString()
  @IsOptional()
  postchangelog?: IGreaseScripts['postchangelog']

  @IsString()
  @IsOptional()
  postcommit?: IGreaseScripts['postcommit']

  @IsString()
  @IsOptional()
  postdepchecker?: IGreaseScripts['postdepchecker']

  @IsString()
  @IsOptional()
  postgreaser?: IGreaseScripts['postgreaser']

  @IsString()
  @IsOptional()
  postnotes?: IGreaseScripts['postnotes']

  @IsString()
  @IsOptional()
  posttag?: IGreaseScripts['posttag']

  @IsString()
  @IsOptional()
  prebump?: IGreaseScripts['prebump']

  @IsString()
  @IsOptional()
  prechangelog?: IGreaseScripts['prechangelog']

  @IsString()
  @IsOptional()
  precommit?: IGreaseScripts['precommit']

  @IsString()
  @IsOptional()
  pregreaser?: IGreaseScripts['pregreaser']

  @IsString()
  @IsOptional()
  prenotes?: IGreaseScripts['prenotes']

  @IsString()
  @IsOptional()
  prerelease?: IGreaseScripts['prerelease']

  @IsString()
  @IsOptional()
  pretag?: IGreaseScripts['pretag']
}
