import { NotesType } from '@grease/enums/notes-type.enum'
import type {
  GitSemverTagsOptions,
  PathLike,
  StandardVersionOptions
} from '@grease/types'
import type { Config } from 'conventional-changelog-config-spec'
import type { ICreateReleaseDTO } from './create-release-dto.interface'
import type { IGreaseScripts } from './grease-scripts.interface'
import type { IGreaseSkip } from './grease-skip.interface'

/**
 * @file Interfaces - IGreaseOptions
 * @module grease/interfaces/IGreaseOptions
 */

/**
 * `grease` options interface.
 *
 * @extends StandardVersionOptions
 */
export interface IGreaseOptions
  extends Omit<StandardVersionOptions, 'infile' | 'types'> {
  /**
   * `.git` dir location.
   *
   * @default process.env.PROJECT_CWD
   */
  gitdir?: string

  /**
   * Read the CHANGELOG from this file.
   *
   * @default 'CHANGELOG.md'
   */
  infile?: PathLike

  /**
   * Name of the package from which tags will be extracted.
   */
  lernaPackage?: GitSemverTagsOptions['package']

  /**
   * Read GitHub release from file.
   *
   * If defined, the `notes` lifecycle will be skipped.
   */
  notesFile?: ICreateReleaseDTO['notesFile']

  /**
   * Type of release notes to generate.
   *
   * @default NotesType.CHANGELOG
   */
  notesType?: NotesType

  /**
   * GitHub release asset paths.
   */
  releaseAssets?: ICreateReleaseDTO['files']

  /**
   * Array of [branch names or branch name globs][1] to restrict releases to.
   *
   * [1]: https://github.com/micromatch/anymatch
   */
  releaseBranchWhitelist?: string[]

  /**
   * Save GitHub release as a draft instead of publishing it.
   *
   * @default true
   */
  releaseDraft?: ICreateReleaseDTO['draft']

  /**
   * GitHub release target branch or full commit SHA.
   *
   * @default 'main'
   */
  releaseTarget?: ICreateReleaseDTO['target']

  /**
   * GitHub release title.
   */
  releaseTitle?: ICreateReleaseDTO['title']

  /**
   * Select another repository using the `[HOST/]OWNER/REPO` format.
   */
  repo?: ICreateReleaseDTO['repo']

  /**
   * Map containing scripts to execute before and/or lifecycle events.
   *
   * @default {}
   */
  scripts?: IGreaseScripts

  /**
   * Map of lifecycles that should be skipped.
   *
   * @default {}
   */
  skip?: IGreaseSkip

  /**
   * If `true`, unstable tags (e.g. `x.x.x-rc.2`) will be skipped.
   */
  skipUnstable?: GitSemverTagsOptions['skipUnstable']

  /**
   * An array of `type` objects representing the explicitly supported commit
   * message types, and whether they should show up in generated `CHANGELOG`s.
   *
   * @default
   *  [
   *    { type: 'feat', section: 'Features' },
   *    { type: 'fix', section: 'Bug Fixes' },
   *    { type: 'chore', hidden: true },
   *    { type: 'docs', hidden: true },
   *    { type: 'style', hidden: true },
   *    { type: 'refactor', hidden: true },
   *    { type: 'perf', hidden: true },
   *    { type: 'test', hidden: true }
   *  ]
   */
  types?: Config.Type.Base[]
}

/**
 * Default `grease` options.
 */
export type GreaseOptionsDefaults = NonNullable<
  Pick<
    IGreaseOptions,
    | 'bumpFiles'
    | 'commitAll'
    | 'commitUrlFormat'
    | 'compareUrlFormat'
    | 'dryRun'
    | 'firstRelease'
    | 'gitTagFallback'
    | 'header'
    | 'infile'
    | 'issuePrefixes'
    | 'issueUrlFormat'
    | 'noVerify'
    | 'notesType'
    | 'packageFiles'
    | 'preMajor'
    | 'preset'
    | 'releaseCommitMessageFormat'
    | 'releaseDraft'
    | 'releaseTarget'
    | 'scripts'
    | 'sign'
    | 'silent'
    | 'skip'
    | 'tagPrefix'
    | 'types'
    | 'userUrlFormat'
  >
> &
  Pick<IGreaseOptions, 'gitdir'>
