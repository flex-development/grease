/**
 * @file Unit Tests - readConfig
 * @module tsconfig-utils/lib/tests/unit/readConfig
 */

import testSubject from '#lib/read-config'
import * as mlly from '@flex-development/mlly'
import pathe from '@flex-development/pathe'

describe('unit:lib/readConfig', () => {
  type Case = Parameters<typeof testSubject>

  it.each<Case>([
    ['@vitest/grease-config']
  ])('should throw if config file is not found (%j)', async (id, options) => {
    await expect(async () => testSubject(id, options)).rejects.to.throw(Error)
  })

  it.each<Case>([
    ['#fixtures/empty', { parent: pathe.pathToFileURL('package.json') }],
    [pathe.pathToFileURL('packages/grease-util-config/package.json')]
  ])('should return empty config on schema error (%j)', async (id, options) => {
    // Act
    const result = await testSubject(id, options)

    // Expect
    expect(result).to.have.keys(['config', 'url'])
    expect(result).to.have.property('config').eql({})
    expect(result).to.have.property('url').be.instanceof(URL)
  })

  it.each<Case>([
    ['#fixtures/grease.config', { parent: import.meta.url }],
    ['./packages/grease-util-config/__fixtures__/package.json'],
    ['__fixtures__/empty.json', { cwd: mlly.cwd() }],
    ['packages/grease-util-config/__fixtures__/grease.config.json']
  ])('should return resolved config (%j)', async (id, options) => {
    expect(await testSubject(id, options)).toMatchSnapshot()
  })
})
