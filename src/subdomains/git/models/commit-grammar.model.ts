/**
 * @file Models - CommitGrammar
 * @module grease/git/models/CommitGrammar
 */

import { CommitGrammarOptions } from '#src/git/options'
import {
  join,
  regexp,
  select,
  template,
  unique,
  type Partial
} from '@flex-development/tutils'

/**
 * Commit parser grammar.
 *
 * @class
 */
class CommitGrammar {
  /**
   * Grammar options.
   *
   * @see {@linkcode CommitGrammarOptions}
   *
   * @protected
   * @readonly
   * @instance
   * @member {CommitGrammarOptions} options
   */
  protected readonly options: CommitGrammarOptions

  /**
   * Create a new commit grammar instance.
   *
   * @see {@linkcode CommitGrammarOptions}
   *
   * @param {Partial<CommitGrammarOptions>?} [options] - Grammar options
   */
  constructor(options?: Partial<CommitGrammarOptions>) {
    this.options = new CommitGrammarOptions(options)
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
    return /^(?<type>[a-z]+)(?:\((?<scope>[a-z-]+)\))?(?<breaking>!)?: +(?<subject>(?:.+ \([!#](?<pr>\d+)\))|.+)/i
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
   * Get a regular expression matching references in a raw commit.
   *
   * @see https://regex101.com/r/Thsp1M
   *
   * @public
   *
   * @return {RegExp} Reference regex
   */
  public get reference(): RegExp {
    /**
     * Pattern matching issue references in commit bodies.
     *
     * @const {string} pattern
     */
    const pattern: string =
      '(?:(?:(?<action>{actions}) +)|(?<repository>(?<owner>[\\da-z](?:-(?=[\\da-z])|[\\da-z]){0,38}(?<=[\\da-z]))\\/(?<repo>\\S+)))?(?<ref>(?<prefix>{prefixes})(?<number>\\d+))'

    return new RegExp(
      template(pattern, {
        actions: join(this.options.actions, '|'),
        prefixes: join(select(unique([
          ...this.options.issues,
          ...this.options.pr
        ]), null, regexp), '|')
      }),
      'gi'
    )
  }

  /**
   * Regular expression matching a semantic release tag.
   *
   * @see https://regex101.com/r/WyQyHZ
   * @see https://semver.org
   *
   * @public
   *
   * @return {RegExp} Semantic release tag regex
   */
  public get tag(): RegExp {
    /**
     * Pattern matching semantic release tags.
     *
     * @const {string} pattern
     */
    const pattern: string =
      '^(?<prefix>{prefix})(?<version>(?<major>0|[1-9]\\d*)\\.(?<minor>0|[1-9]\\d*)\\.(?<patch>0|[1-9]\\d*)(?:-(?<prerelease>(?:0|[1-9]\\d*|\\d*[A-Za-z-][\\dA-Za-z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[A-Za-z-][\\dA-Za-z-]*))*))?(?:\\+(?<metadata>[\\dA-Za-z-]+(?:\\.[\\dA-Za-z-]+)*))?)$'

    return new RegExp(template(pattern, { prefix: this.options.tagprefix }))
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
