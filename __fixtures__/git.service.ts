/**
 * @file Test Fixtures - GitService
 * @module tests/fixtures/git
 */

import GitService from '#src/git/providers/git.service'
import LoggerService from '#src/providers/logger.service'

export default new GitService(new LoggerService())
