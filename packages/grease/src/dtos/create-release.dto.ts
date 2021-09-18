import type { ObjectPlain } from '@flex-development/tutils'
import $c from '@grease/config/cache.config'
import {
  DEFAULT_VERSION,
  GREASER_TITLE_BIRTHDAY
} from '@grease/config/constants.config'
import IsPath from '@grease/decorators/is-path.decorator'
import IsSemVer from '@grease/decorators/is-sem-ver.decorator'
import IsTargetBranch from '@grease/decorators/is-target-branch.decorator'
import type { ICreateReleaseDTO } from '@grease/interfaces'
import { IsBoolean, IsOptional, IsString, ValidateIf } from 'class-validator'
import join from 'lodash/join'
import pick from 'lodash/pick'
import { quote } from 'shell-quote'

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
  /**
   * @static
   * @property {(keyof ICreateReleaseDTO)[]} PROPS - `CreateReleaseDTO` props
   */
  static PROPS: (keyof ICreateReleaseDTO)[] = [
    'draft',
    'files',
    'notes',
    'notesFile',
    'prerelease',
    'repo',
    'target',
    'title',
    'version'
  ]

  @IsBoolean()
  @IsOptional()
  readonly draft?: ICreateReleaseDTO['draft']

  @IsPath({ each: true, exists: false, gh: true })
  @IsOptional()
  @ValidateIf(() => $c.options.dryRun === false)
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

  @IsTargetBranch({ dir: $c.options.gitdir, sha: true })
  @IsOptional()
  readonly target?: ICreateReleaseDTO['target']

  @IsString()
  @IsOptional()
  readonly title?: ICreateReleaseDTO['title']

  @IsSemVer({ clean: true, git: () => $c.git })
  @ValidateIf(() => !$c.options.dryRun && !$c.options.skip?.tag)
  readonly version: ICreateReleaseDTO['version']

  /**
   * Creates a new GitHub release data transfer object.
   *
   * @see https://cli.github.com/manual/gh_release_create
   *
   * @param {ICreateReleaseDTO | ObjectPlain} [data={}] - Data to create release
   */
  constructor(data: ICreateReleaseDTO | ObjectPlain = {}) {
    // Pick dto properties
    const dto: ICreateReleaseDTO = pick(data, CreateReleaseDTO.PROPS)

    // Force validation error if version is missing (skip possible `Cannot read
    // property 'endsWith' of undefined` error)
    if (!dto.version) dto.version = DEFAULT_VERSION

    // Update release title
    if (!dto.title && dto.version.endsWith('1.0.0')) {
      dto.title = `${dto.version} ${GREASER_TITLE_BIRTHDAY}`
    } else if (!dto.title) dto.title = dto.version

    // Validate and assign properties
    Object.assign(this, dto)
  }

  /**
   * Converts the DTO into a [`gh release create`][1] argument string.
   *
   * [1]: https://cli.github.com/manual/gh_release_create
   *
   * @return {string} `gh release create` arguments
   */
  toString(): string {
    return join(this.toStringArgs(), ' ')
  }

  /**
   * Converts the DTO into a [`gh release create`][1] string arguments array.
   *
   * [1]: https://cli.github.com/manual/gh_release_create
   *
   * @return {string[]} `gh release create` arguments as array
   */
  toStringArgs(): string[] {
    return [
      // Release tag
      this.version,

      // Release asset files
      ...(() => {
        const files = this.files?.map(file => {
          return file.toString().includes('#') ? `'${file}'` : file.toString()
        })

        return files?.flat() ?? []
      })(),

      // Create draft release?
      this.draft ? '--draft' : '',

      // Create prerelease?
      this.prerelease ? '--prerelease' : '',

      // Select another repository using `[HOST/]OWNER/REPO` format
      this.repo ? `--repo ${this.repo}` : '',

      // Target branch or commit sha
      this.target ? `--target ${this.target}` : '',

      // Release title
      this.title ? `--title ${quote([this.title])}` : '',

      // Release notes file
      this.notesFile ? `--notes-file ${this.notesFile}` : '',

      // Release notes
      this.notes ? `--notes ${quote([this.notes])}` : ''
    ].filter(Boolean)
  }
}
