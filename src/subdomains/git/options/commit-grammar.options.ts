/**
 * @file Options - CommitGrammarOptions
 * @module grease/git/options/CommitGrammarOptions
 */

import { RepositoryProvider } from '#src/git/enums'
import {
  get,
  isString,
  select,
  sort,
  unique,
  type Partial
} from '@flex-development/tutils'
import {
  IsArray,
  IsEnum,
  IsString,
  MinLength
} from 'class-validator'

/**
 * Commit parser grammar options.
 *
 * @class
 */
class CommitGrammarOptions {
  /**
   * Reference action keywords.
   *
   * @default
   *  based on provider
   *
   * @public
   * @instance
   * @member {string[]} actions
   */
  @IsArray()
  @IsString({ each: true })
  @MinLength(1, { each: true })
  public actions: string[]

  /**
   * Issue reference prefixes.
   *
   * @default
   *  based on provider
   *
   * @public
   * @instance
   * @member {string[]} issues
   */
  @IsArray()
  @IsString({ each: true })
  public issues: string[]

  /**
   * Pull request reference prefixes.
   *
   * @default
   *  based on provider
   *
   * @public
   * @instance
   * @member {string[]} pr
   */
  @IsArray()
  @IsString({ each: true })
  public pr: string[]

  /**
   * Repository provider name.
   *
   * @default RepositoryProvider.GITHUB
   *
   * @public
   * @instance
   * @member {RepositoryProvider} provider
   */
  @IsEnum(RepositoryProvider)
  public provider: RepositoryProvider

  /**
   * Tag prefix.
   *
   * @default ''
   *
   * @public
   * @instance
   * @member {string} tagprefix
   */
  @IsString()
  public tagprefix: string

  /**
   * Create a new options object.
   *
   * @param {Partial<CommitGrammarOptions>?} [opts] - Commit grammar options
   */
  constructor(opts?: Partial<CommitGrammarOptions>) {
    this.actions = select(get(opts, 'actions', []), isString)
    this.issues = select(get(opts, 'issues', []), isString)
    this.pr = select(get(opts, 'pr', []), isString)
    this.provider = get(opts, 'provider', RepositoryProvider.GITHUB)
    this.tagprefix = get(opts, 'tagprefix', '')

    // add common provider actions and prefixes
    this.actions.push('close', 'closed', 'closes', 'fix', 'fixed')
    this.issues.push('#')
    this.provider !== RepositoryProvider.GITLAB && this.pr.push('#')

    // add actions and prefixes based on provider
    switch (this.provider) {
      case RepositoryProvider.BITBUCKET:
        this.actions.push(
          'closing',
          'fixes',
          'fixing',
          'resolve',
          'resolved',
          'resolves',
          'resolving'
        )
        this.issues.unshift('JRA-', 'JIRA-')
        break
      case RepositoryProvider.GITLAB:
        this.actions.push('closing', 'fixes', 'fixing')
        this.pr.push('!')
        break
      default:
        this.actions.push('fixes', 'resolve', 'resolved', 'resolves')
        this.issues.push('GH-')
        break
    }

    // ensure actions and prefixes are unique
    this.actions = sort(unique(this.actions), (a, b) => b.length - a.length)
    this.issues = unique(this.issues)
    this.pr = unique(this.pr)
  }
}

export default CommitGrammarOptions
