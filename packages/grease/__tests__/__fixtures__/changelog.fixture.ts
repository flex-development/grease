import { readFileSync } from 'fs'
import path from 'path'

/**
 * @file Workspace Test Fixture - CHANGELOG content
 * @module grease/tests/fixtures/changelog
 */

export default `${readFileSync(path.join(__dirname, 'CHANGELOG.fixture.md'))}`
