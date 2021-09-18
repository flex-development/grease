import { ICreateReleaseDTO } from '@grease/interfaces'
import { VERSION } from './git-tags.fixture'
import NOTES from './notes.fixture'

/**
 * @file Workspace Test Fixture - CreateReleaseDTO
 * @module grease/tests/fixtures/CreateReleaseDTO
 */

export default {
  draft: true,
  files: ['./*.tgz', './README.md#My display label'],
  notes: NOTES,
  notesFile: undefined,
  prerelease: false,
  repo: 'flex-development/grease',
  target: 'main',
  title: undefined,
  version: `v${VERSION}`
} as ICreateReleaseDTO
