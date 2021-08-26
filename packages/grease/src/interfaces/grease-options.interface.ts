import type { DistTagOptions } from '@flex-development/dtag/interfaces'
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
   * Create a prerelease with optional tag id (e.g: `alpha`,`beta`, `dev`).
   *
   * This value can be autodetected by `grease` assuming that the intended value
   * is included within a project version number or release tag (e.g
   * `3.13.98-dev.640` where `dev` is the intended value).
   *
   * Passing a string value will override the autodetected value.
   *
   * To disable autodetection, set `prereleaseSkip` to `true`.
   *
   * [1]: https://docs.npmjs.com/cli/v7/commands/npm-dist-tag
   */
  prerelease?: StandardVersionOptions['prerelease']

  /**
   * Prerelease delimiter (e.g `-` before `alpha` in `foo-pkg@26.0.0-alpha.13`).
   *
   * @see https://github.com/flex-development/dtag/tree/next/packages/dtag#options
   *
   * @default '-'
   */
  prereleaseDelimiter?: DistTagOptions['delimiter']

  /**
   * `prerelease` tag id map. If a tag id is found within a project version
   * number and `prereleaseMap` is a non-empty object, the value of `prerelease`
   * will be plucked from `prereleaseMap`.
   *
   * @see https://github.com/flex-development/dtag/tree/next/packages/dtag#options
   *
   * @default {}
   */
  prereleaseMap?: Map<string, string>

  /**
   * Skip distribution tag lookup.
   *
   * @see https://github.com/flex-development/dtag/tree/next/packages/dtag
   */
  prereleaseSkip?: DistTagOptions['skip']

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

  /**
   * Bypass pre-commit or commit-msg git hooks during the commit phase.
   *
   * @default false
   */
  verify?: boolean
}

/**
 * Default `grease` options.
 */
export type GreaseOptionsDefaults = {
  bumpFiles: NonNullable<IGreaseOptions['bumpFiles']>
  commitAll: NonNullable<IGreaseOptions['commitAll']>
  commitUrlFormat: NonNullable<IGreaseOptions['commitUrlFormat']>
  compareUrlFormat: NonNullable<IGreaseOptions['compareUrlFormat']>
  dryRun: NonNullable<IGreaseOptions['dryRun']>
  firstRelease: NonNullable<IGreaseOptions['firstRelease']>
  gitTagFallback: NonNullable<IGreaseOptions['gitTagFallback']>
  gitdir: NonNullable<IGreaseOptions['gitdir']>
  header: NonNullable<IGreaseOptions['header']>
  infile: NonNullable<IGreaseOptions['infile']>
  issuePrefixes: NonNullable<IGreaseOptions['issuePrefixes']>
  issueUrlFormat: NonNullable<IGreaseOptions['issueUrlFormat']>
  noVerify: NonNullable<IGreaseOptions['noVerify']>
  notesType: NonNullable<IGreaseOptions['notesType']>
  packageFiles: NonNullable<IGreaseOptions['packageFiles']>
  preMajor: NonNullable<IGreaseOptions['preMajor']>
  prereleaseDelimiter: NonNullable<IGreaseOptions['prereleaseDelimiter']>
  prereleaseMap: NonNullable<IGreaseOptions['prereleaseMap']>
  preset: NonNullable<IGreaseOptions['preset']>
  releaseCommitMessageFormat: NonNullable<
    IGreaseOptions['releaseCommitMessageFormat']
  >
  releaseDraft: NonNullable<IGreaseOptions['releaseDraft']>
  releaseTarget: NonNullable<IGreaseOptions['releaseTarget']>
  scripts: NonNullable<IGreaseOptions['scripts']>
  sign: NonNullable<IGreaseOptions['sign']>
  silent: NonNullable<IGreaseOptions['silent']>
  skip: NonNullable<IGreaseOptions['skip']>
  tagPrefix: NonNullable<IGreaseOptions['tagPrefix']>
  types: NonNullable<IGreaseOptions['types']>
  userUrlFormat: NonNullable<IGreaseOptions['userUrlFormat']>
  verify: NonNullable<IGreaseOptions['verify']>
}
