/**
 * @file Unit Tests - CommitGrammar
 * @module grease/models/tests/unit/CommitGrammar
 */

import { dedent } from 'ts-dedent'
import TestSubject from '../grammar-commit.model'

describe('unit:models/CommitGrammar', () => {
  let subject: TestSubject

  beforeAll(() => {
    subject = new TestSubject()
  })

  describe('#field', () => {
    let fields: string
    let flags: string
    let source: string

    beforeAll(() => {
      fields = dedent`
        -author.email-
        unicornware@flexdevelopment.llc
        -author.name-
        Lex
        -body-
        Signed-off-by: Lexus Drumgold <unicornware@flexdevelopment.llc>
        -date-
        2023-09-09T23:59:31+00:00
        -hash-
        a399eae
        -sha-
        a399eaeff03a88cdb1d59fc1fb42d88fcdc773fe
        -tags-
        tag: 1.0.0-alpha.23
        -trailers-
        Signed-off-by: Lexus Drumgold <unicornware@flexdevelopment.llc>
      `

      flags = subject.field.flags
      source = subject.field.source
    })

    it('should match raw commit fields', () => {
      // Act
      const result = [...fields.matchAll(new RegExp(source, flags + 'g'))]

      // Expect
      expect(result).to.not.be.null
      expect(result).toMatchSnapshot()
    })
  })

  describe('#header', () => {
    it.each<[components: string, header: string]>([
      [
        'breaking,subject,pr',
        'refactor!: statements (#3)'
      ],
      [
        'breaking,subject',
        'feat!: watch mode'
      ],
      [
        'scope,breaking,subject,pr',
        'refactor(utils)!: [getFormat] enforce absolute module id (#3)'
      ],
      [
        'scope,breaking,subject',
        'refactor(utils)!: [`analyzeOutputs`] intake `esbuild.Metafile.outputs`'
      ],
      [
        'scope,subject,pr',
        'build(deps): Bump the flex-development group with 3 updates (#330)'
      ],
      [
        'scope,subject',
        'fix(config): prevent `import.meta.url` from being rewritten'
      ],
      [
        'subject,pr',
        'feat: file-to-file transpilation (#4)'
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
    let raw: string

    beforeAll(() => {
      raw = dedent`
        ci: add @dependabot config
        -author.email-
        unicornware@flexdevelopment.llc
        -author.name-
        Lexus Drumgold
        -body-
        Signed-off-by: Lexus Drumgold <unicornware@flexdevelopment.llc>

        -date-
        2022-09-01T00:37:08-04:00
        -hash-
        9c58d1c
        -sha-
        9c58d1ca753406bbba92c729360b9b6e400a6e9a
        -tags-

        -trailers-
        Signed-off-by: Lexus Drumgold <unicornware@flexdevelopment.llc>

      `
    })

    it('should match mentions in raw commit', () => {
      // Act
      const result = [...raw.matchAll(subject.mention)]

      // Expect
      expect(result).to.not.be.null
      expect(result).toMatchSnapshot()
    })
  })

  describe('#reference', () => {
    let raw: string

    beforeAll(() => {
      raw = dedent`
        chore: dprint migration
        -author.email-
        unicornware@flexdevelopment.llc
        -author.name-
        Lexus Drumgold
        -body-
        - prettier 3.0 formatting has degraded in quality for js-like files, but the team refuses to fix it
        - prettier can be removed completely once dprint has its own yaml plugin + better json5 support
        - prettier markdown formatting was always subpar; it never played nicely with markdownlint
        - closes GH-335
        - prettier/prettier#15358
        - prettier/prettier#5715
        - prettier/prettier#11881
        - dprint/dprint#736
        - dprint/dprint-plugin-typescript#432

        Signed-off-by: Lexus Drumgold <unicornware@flexdevelopment.llc>

        -date-
        2023-09-09T19:00:25-04:00
        -hash-
        7f578c9
        -sha-
        7f578c90c69d12b283e49b9036c06029585630f8
        -tags-

        -trailers-
        Signed-off-by: Lexus Drumgold <unicornware@flexdevelopment.llc>

      `
    })

    it('should match references in raw commit', () => {
      // Act
      const result = [...raw.matchAll(subject.reference(['#', 'gh-']))]

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
