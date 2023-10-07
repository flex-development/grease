/**
 * @file Test Fixtures - TYPES
 * @module tests/fixtures/changelog/TYPES
 */

import { TYPES } from '#src/changelog/constants'
import CommitType from '#src/changelog/models/commit-type.model'
import { select } from '@flex-development/tutils'

export default select(TYPES, null, type => new CommitType(type))
