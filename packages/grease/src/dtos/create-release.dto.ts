import type { ObjectPlain } from '@flex-development/tutils'
import cache from '@grease/config/cache.config'
import { GREASER_TITLE_BIRTHDAY } from '@grease/config/constants.config'
import IsPath from '@grease/decorators/is-path.decorator'
import IsSemVer from '@grease/decorators/is-sem-ver.decorator'
import IsTargetBranch from '@grease/decorators/is-target-branch.decorator'
import type { ICreateReleaseDTO } from '@grease/interfaces'
import { IsBoolean, IsOptional, IsString } from 'class-validator'
import join from 'lodash/join'
import pick from 'lodash/pick'

/**
 * @file Data Transfer Objects - CreateReleaseDTO
 * @module grease/dtos/CreateRelease
 */

/**
 * Data used to create a [GitHub release via the GitHub CLI][1].
 *
 * [1]: https://cli.github.com/manual/gh_release_create
 *
 * @implements {ICreateReleaseDTO}
 */
export default class CreateReleaseDTO implements ICreateReleaseDTO {
  @IsBoolean()
  @IsOptional()
  readonly draft?: ICreateReleaseDTO['draft']

  @IsPath({ each: true, gh: true })
  @IsOptional()
  readonly files?: ICreateReleaseDTO['files']

  @IsString()
  @IsOptional()
  readonly notes?: ICreateReleaseDTO['notes']

  @IsPath()
  @IsOptional()
  readonly notesFile?: ICreateReleaseDTO['notesFile']

  @IsBoolean()
  @IsOptional()
  readonly prerelease?: ICreateReleaseDTO['prerelease']

  @IsString()
  @IsOptional()
  readonly repo?: ICreateReleaseDTO['repo']

  @IsString()
  @IsOptional()
  readonly tagPrefix?: ICreateReleaseDTO['tagPrefix']

  @IsTargetBranch({ dir: cache.options.gitdir, sha: true })
  @IsOptional()
  readonly target?: ICreateReleaseDTO['target']

  @IsString()
  @IsOptional()
  readonly title?: ICreateReleaseDTO['title']

  @IsSemVer({ git: cache.git })
  readonly version: ICreateReleaseDTO['version']

  /**
   * Creates a new GitHub release data transfer object.
   *
   * @param {ICreateReleaseDTO | ObjectPlain} [data={}] - Data to create release
   */
  constructor(data: ICreateReleaseDTO | ObjectPlain = {}) {
    const keys: (keyof ICreateReleaseDTO)[] = [
      'draft',
      'files',
      'notes',
      'notesFile',
      'prerelease',
      'repo',
      'tagPrefix',
      'target',
      'title',
      'version'
    ]

    Object.assign(this, pick(data, keys))
  }

  /**
   * Converts the DTO into a [`gh release create`][1] argument string.
   *
   * [1]: https://cli.github.com/manual/gh_release_create
   *
   * @todo Handle lerna tags
   *
   * @return {string} `gh release create` arguments
   */
  toString(): string {
    // Spread data
    const {
      draft = false,
      files = [],
      notes = '',
      notesFile = '',
      prerelease,
      repo = '',
      tagPrefix = '',
      target = '',
      title = '',
      version = ''
    } = this

    // Get release tag
    const tag: string = `${cache.git?.package ?? ''}${tagPrefix}${version}`

    // Init command arguments array
    const args: string[] = [tag]

    // Add release asset files
    if (files && files.length) args.push(join(files, ' '))

    // Save release as draft or publish
    if (draft) args.push('--draft')

    // Add release notes
    if (notes && notes.length) args.push(`--notes ${notes}`)

    // Read release notes from file
    if (notesFile && notesFile.toString().length) {
      args.push(`--notes-file ${notesFile}`)
    }

    // Mark as prerelease
    if (prerelease) args.push('--prerelease')

    // Target branch or commit sha
    if (target && target.length) args.push(`--target ${target}`)

    // Push release to different repository
    if (repo && repo.length) args.push(`--repo ${repo}`)

    // Add release title
    if (version === '1.0.0' && (!title || !title.length)) {
      args.push(`--title ${tag} ${GREASER_TITLE_BIRTHDAY}`)
    } else if (title && title.length) {
      args.push(`--title ${title}`)
    }

    return join(args, ' ').trim()
  }
}
