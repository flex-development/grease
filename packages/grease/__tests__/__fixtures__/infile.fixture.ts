import type { IGreaseOptions } from '@grease/interfaces'

/**
 * @file Workspace Test Fixture - IGreaseOptions.infile
 * @module grease/tests/fixtures/infile
 */

const cwd: string = `${process.env.PROJECT_CWD}/packages/grease`
const infile: string = `${cwd}/__tests__/__fixtures__/CHANGELOG.fixture.md`

export default infile as NonNullable<IGreaseOptions['infile']>
