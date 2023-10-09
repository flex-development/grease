/**
 * @file Test Fixtures - CommitQueryHandler
 * @module tests/fixtures/cqh
 */

import CommitQueryHandler from '#src/git/queries/commit.handler'
import ValidationService from '#src/providers/validation.service'
import git from './git.service'

export default new CommitQueryHandler(git, new ValidationService())
