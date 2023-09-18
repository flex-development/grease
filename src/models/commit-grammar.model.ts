/**
 * @file Models - CommitGrammar
 * @module grease/models/CommitGrammar
 */

import { RepositoryProvider } from '#src/enums'
import { join, template } from '@flex-development/tutils'

/**
 * Commit parser grammar.
 *
 * @class
 */
class CommitGrammar {
  /**
   * Issue reference prefixes.
   *
   * @default ['#','gh-']
   *
   * @public
   * @instance
   * @member {string[]} issue_prefixes
   */
  public issue_prefixes: string[]

  /**
   * Repository provider.
   *
   * @see {@linkcode RepositoryProvider}
   *
   * @default RepositoryProvider.GITHUB
   *
   * @public
   * @instance
   * @member {RepositoryProvider} provider
   */
  public provider: RepositoryProvider

  /**
   * Create a new commit grammar instance.
   *
   * @param {RepositoryProvider} [provider=Repository.GITHUB] - Repo provider
   * @param {string[]?} [issue_prefixes=['#','gh-']] - Issue reference prefixes
   */
  constructor(
    provider: RepositoryProvider = RepositoryProvider.GITHUB,
    issue_prefixes: string[] = ['#', 'gh-']
  ) {
    this.provider = provider
    this.issue_prefixes = issue_prefixes
  }

  /**
   * Regular expression matching fields in a raw commit.
   *
   * @see https://regex101.com/r/QnFMsV
   *
   * @public
   *
   * @return {RegExp} Raw commit field regex
   */
  public get field(): RegExp {
    return /^-(?<field>[^\s$]+?)-\n(?<value>.*?(?=\n*^-\S+?-)|(?:.*$))/gms
  }

  /**
   * Regular expression matching a commit header.
   *
   * @see https://regex101.com/r/WAJeLp
   * @see https://conventionalcommits.org
   *
   * @public
   *
   * @return {RegExp} Commit header regex
   */
  public get header(): RegExp {
    return /^(?<type>[a-z]+)(?:\((?<scope>[a-z-]+)\))?(?<breaking>!)?: +(?<subject>(?:.+ \(#(?<pr>\d+)\))|.+)/i
  }

  /**
   * Regular expression matching mentions (e.g. `@unicornware`) in a raw commit.
   *
   * @see https://regex101.com/r/upbRpj
   *
   * @public
   *
   * @return {RegExp} Mention regex
   */
  public get mention(): RegExp {
    return /\B(?<mention>@(?<user>[\w-]{1,38}(?=[^\w-]\B|\s)))/g
  }

  /**
   * Get a regular expression matching issue references in a raw commit.
   *
   * @see https://regex101.com/r/Thsp1M
   *
   * @public
   *
   * @return {RegExp} Issue reference regex
   */
  public get reference(): RegExp {
    /**
     * Pattern matching issue references in commit bodies.
     *
     * @const {string} pattern
     */
    const pattern: string =
      '(?:(?:(?<action>(?:close|resolve)[ds]?|fix(?:e[ds])?|releases) +)|(?<repository>(?<owner>[\\da-z](?:-(?=[\\da-z])|[\\da-z]){0,38}(?<=[\\da-z]))\\/(?<repo>\\S+)))?(?<ref>(?<prefix>{prefixes})(?<number>\\d+))'

    return new RegExp(
      template(pattern, { prefixes: join(this.issue_prefixes, '|') }),
      'gi'
    )
  }

  /**
   * Regular expression matching trailers in a raw commit.
   *
   * @see https://git-scm.com/docs/git-interpret-trailers
   * @see https://regex101.com/r/I56Kgg
   *
   * @return {RegExp} Git trailer regex
   */
  public get trailer(): RegExp {
    return /(?<=^|\n)(?<token>[\w -]+?(?=:)): (?<value>[\S\s]+?(?:(?=\n[\w -]+?(?=:))|(?=\n*$)))/g
  }
}

export default CommitGrammar
