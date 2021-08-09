import type { IGreaseSkip } from '@grease/interfaces'
import { IsBoolean, IsOptional } from 'class-validator'

/**
 * @file Data Models - GreaseSkip
 * @module grease/models/GreaseSkip
 */

/**
 * `IGreaseSkip` data model.
 *
 * @class
 * @implements {IGreaseSkip}
 */
export default class GreaseSkip implements IGreaseSkip {
  @IsBoolean()
  @IsOptional()
  bump?: IGreaseSkip['bump']

  @IsBoolean()
  @IsOptional()
  changelog?: IGreaseSkip['changelog']

  @IsBoolean()
  @IsOptional()
  commit?: IGreaseSkip['commit']

  @IsBoolean()
  @IsOptional()
  depchecker?: IGreaseSkip['depchecker']

  @IsBoolean()
  @IsOptional()
  greaser?: IGreaseSkip['greaser']

  @IsBoolean()
  @IsOptional()
  notes?: IGreaseSkip['notes']

  @IsBoolean()
  @IsOptional()
  tag?: IGreaseSkip['tag']
}
