/**
 * @file Unit Tests - CommitGrammar
 * @module grease/git/models/tests/unit/CommitGrammar
 */

import sha from '#fixtures/git/grease/sha'
import tagprefix from '#fixtures/git/grease/tagprefix'
import { CommitGrammarOptions } from '#src/git/options'
import chunkfix from '#tests/utils/chunkfix'
import type { SemanticVersion } from '@flex-development/pkg-types'
import { dedent } from 'ts-dedent'
import TestSubject from '../commit-grammar.model'

describe('unit:git/models/CommitGrammar', () => {
  let subject: TestSubject

  beforeAll(() => {
    subject = new TestSubject({ tagprefix })
  })

  describe('constructor', () => {
    it('should set #options', () => {
      expect(subject)
        .to.have.property('options')
        .be.instanceof(CommitGrammarOptions)
    })
  })

  describe('#field', () => {
    let chunk: string
    let flags: string
    let source: string

    beforeAll(async () => {
      chunk = await chunkfix('mkbuild', 'release')
      flags = subject.field.flags
      source = subject.field.source
    })

    it('should match raw commit fields', () => {
      // Act
      const result = [...chunk.matchAll(new RegExp(source, flags))]

      // Expect
      expect(result).to.not.be.null
      expect(result).toMatchSnapshot()
    })
  })

  describe('#header', () => {
    it.each<[components: string, header: string]>([
      [
        'breaking,subject',
        'feat!: watch mode'
      ],
      [
        'scope,breaking,subject',
        'refactor(utils)!: [`analyzeOutputs`] intake `esbuild.Metafile.outputs`'
      ],
      [
        'scope,subject',
        'fix(config): prevent `import.meta.url` from being rewritten'
      ],
      [
        'subject',
        'ci: add @dependabot config'
      ]
    ])('should match raw commit header with [type,%s]', (_, header: string) => {
      // Act
      const result = subject.header.exec(header)

      // Expect
      expect(result).to.not.be.null
      expect(result).toMatchSnapshot()
    })

    it('should not match raw commit header without colon after type', () => {
      expect(subject.header.exec('release 1.0.0')).to.be.null
    })

    it('should not match raw commit header without subject', () => {
      expect(subject.header.exec('release:')).to.be.null
    })

    it('should not match raw commit header without type', () => {
      expect(subject.header.exec('initial commit')).to.be.null
    })
  })

  describe('#mention', () => {
    let chunk: string

    beforeAll(async () => {
      chunk = await chunkfix('mkbuild', 'ci')
    })

    it('should match mentions in raw commit', () => {
      // Act
      const result = [...chunk.matchAll(subject.mention)]

      // Expect
      expect(result).to.not.be.null
      expect(result).toMatchSnapshot()
    })
  })

  describe('#reference', () => {
    let chunk: string

    beforeAll(async () => {
      chunk = await chunkfix('mkbuild', 'chore')
    })

    it('should match references in raw commit', () => {
      // Act
      const result = [...chunk.matchAll(subject.reference)]

      // Expect
      expect(result).to.not.be.null
      expect(result).toMatchSnapshot()
    })
  })

  describe('#tag', () => {
    it.each<['release tag' | 'version', string, SemanticVersion]>([
      ['release tag', tagprefix, `2.0.0+${sha}`],
      ['version', '', '3.0.0-alpha.1']
    ])('should match semantic %s', (_, tagprefix, version) => {
      // Arrange
      const subject: TestSubject = new TestSubject({ tagprefix })

      // Act
      const result = subject.tag.exec(tagprefix + version)

      // Expect
      expect(result).to.not.be.null
      expect(result).toMatchSnapshot()
    })
  })

  describe('#trailer', () => {
    let trailers: string

    beforeAll(() => {
      trailers = dedent`
        token: This is a very long value, with spaces and
          newlines in it.
        BREAKING CHANGE: \`extends\` key now used for extending other configs
        BREAKING-CHANGE: use JavaScript features not available in Node 6.
        Reviewed-by: Z
        Refs: #123
      `
    })

    it('should match trailers in raw commit', () => {
      // Act
      const result = [...trailers.matchAll(subject.trailer)]

      // Expect
      expect(result).to.not.be.null
      expect(result).toMatchSnapshot()
    })
  })
})
