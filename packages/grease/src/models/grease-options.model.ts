import cache from '@grease/config/cache.config'
import IsPath from '@grease/decorators/is-path.decorator'
import IsTargetBranch from '@grease/decorators/is-target-branch.decorator'
import { NotesType } from '@grease/enums/notes-type.enum'
import type { IGreaseOptions } from '@grease/interfaces'
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator'
import ChangelogConfigType from './changelog-config-type.model'
import GreaseScripts from './grease-scripts.model'
import GreaseSkip from './grease-skip.model'

/**
 * @file Data Models - GreaseOptions
 * @module grease/models/GreaseOptions
 */

/**
 * `IGreaseOptions` data model.
 *
 * @class
 * @implements {IGreaseOptions}
 */

export default class GreaseOptions implements IGreaseOptions {
  @IsString({ each: true })
  @IsOptional()
  bumpFiles?: IGreaseOptions['bumpFiles']

  @IsString()
  @IsOptional()
  commitUrlFormat?: IGreaseOptions['commitUrlFormat']

  @IsString()
  @IsOptional()
  compareUrlFormat?: IGreaseOptions['compareUrlFormat']

  @IsBoolean()
  @IsOptional()
  dryRun?: IGreaseOptions['dryRun']

  @IsBoolean()
  @IsOptional()
  firstRelease?: IGreaseOptions['firstRelease']

  @IsString()
  @IsOptional()
  gitdir?: IGreaseOptions['gitdir']

  @IsBoolean()
  @IsOptional()
  gitTagFallback?: IGreaseOptions['gitTagFallback']

  @IsString()
  @IsOptional()
  header?: IGreaseOptions['header']

  @IsPath({ exists: false })
  @IsOptional()
  infile?: IGreaseOptions['infile']

  @IsString({ each: true })
  @IsOptional()
  issuePrefixes?: IGreaseOptions['issuePrefixes']

  @IsString()
  @IsOptional()
  issueUrlFormat?: IGreaseOptions['issueUrlFormat']

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lernaPackage?: IGreaseOptions['lernaPackage']

  @IsBoolean()
  @IsOptional()
  noVerify?: IGreaseOptions['noVerify']

  @IsPath()
  @IsOptional()
  notesFile?: IGreaseOptions['notesFile']

  @IsEnum(NotesType)
  @IsOptional()
  notesType?: IGreaseOptions['notesType']

  @IsString({ each: true })
  @IsOptional()
  packageFiles?: IGreaseOptions['packageFiles']

  @IsString()
  @IsOptional()
  path?: IGreaseOptions['path']

  @IsBoolean()
  @IsOptional()
  preMajor?: IGreaseOptions['preMajor']

  @IsString()
  @IsOptional()
  prerelease?: IGreaseOptions['prerelease']

  @IsString()
  @IsOptional()
  prereleaseDelimiter?: IGreaseOptions['prereleaseDelimiter']

  @IsString({ each: true })
  @IsOptional()
  prereleaseMap?: IGreaseOptions['prereleaseMap']

  @IsBoolean()
  @IsOptional()
  prereleaseSkip?: IGreaseOptions['prereleaseSkip']

  @IsString()
  @IsOptional()
  preset?: IGreaseOptions['preset']

  @IsString()
  @IsOptional()
  releaseAs?: IGreaseOptions['releaseAs']

  @IsPath({ each: true, exists: false, gh: true })
  @IsOptional()
  releaseAssets?: IGreaseOptions['releaseAssets']

  @IsString({ each: true })
  @IsNotEmpty()
  @IsOptional()
  releaseBranchWhitelist?: IGreaseOptions['releaseBranchWhitelist']

  @IsString()
  @IsOptional()
  releaseCommitMessageFormat?: IGreaseOptions['releaseCommitMessageFormat']

  @IsBoolean()
  @IsOptional()
  releaseDraft?: IGreaseOptions['releaseDraft']

  @IsTargetBranch({ dir: cache.options.gitdir, sha: true })
  @IsOptional()
  releaseTarget?: IGreaseOptions['releaseTarget']

  @IsString()
  @IsOptional()
  releaseTitle?: IGreaseOptions['releaseTitle']

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  repo?: IGreaseOptions['repo']

  @IsBoolean()
  @IsOptional()
  sign?: IGreaseOptions['sign']

  @IsBoolean()
  @IsOptional()
  silent?: IGreaseOptions['silent']

  @ValidateNested()
  @IsOptional()
  scripts?: GreaseScripts

  @ValidateNested()
  @IsOptional()
  skip?: GreaseSkip

  @IsBoolean()
  @IsOptional()
  skipUnstable?: IGreaseOptions['skipUnstable']

  @IsString()
  @IsOptional()
  tagPrefix?: IGreaseOptions['tagPrefix']

  @ValidateNested({ each: true })
  @IsOptional()
  types?: ChangelogConfigType[]

  @IsString()
  @IsOptional()
  userUrlFormat?: IGreaseOptions['userUrlFormat']

  @IsBoolean()
  @IsOptional()
  verify?: IGreaseOptions['verify']
}
