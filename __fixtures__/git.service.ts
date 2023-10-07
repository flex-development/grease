/**
 * @file Test Fixtures - GitService
 * @module tests/fixtures/git
 */

import GitService from '#src/git/providers/git.service'
import ValidationService from '#src/providers/validation.service'
import logger from './logger.service'

export default new GitService(logger, new ValidationService())
