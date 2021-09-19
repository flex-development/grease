import type { ICommitType } from '@grease/interfaces'

/**
 * @file Workspace Test Fixture - IGreaseOptions.types
 * @module grease/tests/fixtures/types
 */

export default [
  { type: 'feat', section: ':sparkles: Features' },
  { type: 'fix', section: ':bug: Fixes' },
  { type: 'revert', section: ':rewind: Revert' },
  { type: 'test', section: ':robot: Testing' },
  { type: 'docs', section: ':book: Documentation' },
  { type: 'build', section: ':hammer: Build' },
  { type: 'refactor', section: ':recycle: Code Improvements' },
  { type: 'perf', section: ':zap: Performance Updates' },
  { type: 'style', section: ':nail_care: Formatting & Structure' },
  {
    type: 'ci',
    section: ':truck: Continuous Integration & Deployment'
  },
  { type: 'chore', section: ':pencil2: Housekeeping' },
  { type: 'wip', hidden: true }
] as ICommitType[]
