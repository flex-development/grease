/**
 * @file Test Utilities - chunkfix
 * @module test/utils/chunkfix
 */

import fs from 'node:fs/promises'

/**
 * Get a raw commit fixture.
 *
 * @async
 *
 * @param {string} repo - Fixture repository name
 * @param {string} chx - Chunk fixture suffix
 * @return {Promise<string>} Raw commit fixture
 */
const chunkfix = async (repo: string, chx: string): Promise<string> => {
  return fs.readFile(`__fixtures__/git/${repo}/commit-${chx}.txt`, 'utf8')
}

export default chunkfix
