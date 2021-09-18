import { readFileSync } from 'fs'
import { join } from 'path'

/**
 * @file Workspace Test Fixture - CHANGELOG content
 * @module grease/tests/fixtures/changelog
 */

export default `${readFileSync(join(__dirname, 'CHANGELOG.fixture.md'))}`
