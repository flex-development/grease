/**
 * @file Constants
 * @module grease/changelog/constants
 */

import type { ICommitType } from '#src/changelog/interfaces'
import { Type } from '@flex-development/commitlint-config'

/**
 * An array of objects representing explicitly supported commit message types,
 * and whether they should show up in the changelog.
 *
 * @see {@linkcode ICommitType}
 *
 * @const {ICommitType[]} TYPES
 */
export const TYPES: ICommitType[] = [
  { section: ':sparkles: Features', type: Type.FEAT },
  { section: ':bug: Fixes', type: Type.FIX },
  { section: ':mechanical_arm: Refactors', type: Type.REFACTOR },
  { section: ':fire: Performance Improvements', type: Type.PERF },
  { section: ':wastebasket: Reverts', type: Type.REVERT },
  { section: ':pencil: Documentation', type: Type.DOCS },
  { section: ':white_check_mark: Testing', type: Type.TEST },
  { section: ':package: Build', type: Type.BUILD },
  { section: ':robot: Continuous Integration', type: Type.CI },
  { section: ':house_with_garden: Housekeeping', type: Type.CHORE },
  { hidden: true as const, type: Type.RELEASE },
  { hidden: true as const, type: Type.STYLE },
  { hidden: true as const, type: Type.WIP }
]
