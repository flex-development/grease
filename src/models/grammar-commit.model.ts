/**
 * @file Models - CommitGrammar
 * @module grease/models/CommitGrammar
 */

import { join, template } from '@flex-development/tutils'

/**
 * Commit parser grammar.
 *
 * @class
 */
class CommitGrammar {
  /**
   * Regular expression matching fields in a raw commit.
   *
   * @public
   *
   * @return {RegExp} Commit log field regex
   */
  public get field(): RegExp {
    return /^-(?<field>.*?)-(?=\n*)$/m
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

  /**
   * Get a regular expression matching issue references in a raw commit.
   *
   * @see https://regex101.com/r/Thsp1M
   *
   * @public
   *
   * @param {ReadonlyArray<string>} [prefixes=['#']] - Issue prefixes
   * @return {RegExp} Issue reference regex
   */
  public reference(prefixes: readonly string[] = ['#']): RegExp {
    /**
     * Pattern matching issue references in commit bodies.
     *
     * @const {string} pattern
     */
    const pattern: string =
      '(?:(?:(?<action>(?:close|resolve)[ds]?|fix(?:e[ds])?|releases) +)|(?<repository>(?<owner>[\\da-z](?:-(?=[\\da-z])|[\\da-z]){0,38}(?<=[\\da-z]))\\/(?<repo>\\S+)))?(?<ref>(?<prefix>{prefixes})(?<number>\\d+))'

    return new RegExp(
      template(pattern, { prefixes: join(prefixes, '|') }),
      'gi'
    )
  }
}

export default CommitGrammar
