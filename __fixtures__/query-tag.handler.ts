/**
 * @file Test Fixtures - TagQueryHandler
 * @module tests/fixtures/tqh
 */

import TagQueryHandler from '#src/git/queries/tag.handler'
import ValidationService from '#src/providers/validation.service'
import git from './git.service'

export default new TagQueryHandler(git, new ValidationService())
