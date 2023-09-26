/**
 * @file Type Definitions - CommitConstructor
 * @module grease/git/types/CommitConstructor
 */

import type { Commit, Repository } from '#src/git/models'
import type { CommitGrammarOptions } from '#src/git/options'
import type { Constructor, Partial } from '@flex-development/tutils'

/**
 * Parsed commit class constructor.
 *
 * @see {@linkcode Commit}
 * @see {@linkcode CommitGrammarOptions}
 * @see {@linkcode Repository}
 *
 * @template T - Parsed commit type
 */
type CommitConstructor<T extends Commit = Commit> = Constructor<T, [
  chunk: string,
  repository?: Repository,
  grammar?: Partial<CommitGrammarOptions>
]>

export type { CommitConstructor as default }
