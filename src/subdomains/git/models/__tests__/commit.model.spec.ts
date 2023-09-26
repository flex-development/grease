/**
 * @file Unit Tests - Commit
 * @module grease/git/models/tests/unit/Commit
 */

import tagprefix from '#fixtures/git/grease/tagprefix'
import chunkfix from '#tests/utils/chunkfix'
import { keys, type EmptyString } from '@flex-development/tutils'
import CommitGrammar from '../commit-grammar.model'
import TestSubject from '../commit.model'
import Repository from '../repository.model'

describe('unit:git/models/Commit', () => {
  let repository: Repository

  beforeAll(async () => {
    repository = new Repository()
  })

  describe('constructor', () => {
    let chunk: string
    let subject: TestSubject

    beforeAll(async () => {
      subject = new TestSubject(chunk = await chunkfix('grease', 'chore'))
    })

    it('should set #chunk', () => {
      expect(subject).to.have.property('chunk', chunk)
    })

    it('should set #fields', () => {
      expect(subject).to.have.property('fields').satisfy((result: unknown) => {
        return expect(keys(result, { deep: true })).to.include.members([
          'author.email',
          'author.name',
          'author',
          'body',
          'breaking',
          'date',
          'hash',
          'header',
          'pr',
          'scope',
          'sha',
          'subject',
          'tags',
          'trailers',
          'type'
        ])
      })
    })

    it('should set #grammar', () => {
      expect(subject).to.have.property('grammar').be.instanceof(CommitGrammar)
    })

    it('should set #repository', () => {
      expect(subject).to.have.property('repository').be.instanceof(Repository)
    })

    it('should throw if #chunk is empty', () => {
      // Arrange
      let error!: Error

      // Act
      try {
        new TestSubject(' ')
      } catch (e: unknown) {
        error = <typeof error>e
      }

      // Expect
      expect(error).to.be.instanceof(Error)
      expect(error).to.have.property('message', 'empty commit chunk')
    })
  })

  describe('#author', () => {
    let chunk: string

    beforeAll(async () => {
      chunk = await chunkfix('grease', 'ci-workflows')
    })

    it('should return commit author object', () => {
      // Act
      const result = new TestSubject(chunk).author

      // Expect
      expect(result).to.have.all.keys(['email', 'name'])
      expect(result).to.have.property('email').be.a('string').that.is.not.empty
      expect(result).to.have.property('name').be.a('string').that.is.not.empty
    })
  })

  describe('#body', async () => {
    it.each<[`${EmptyString | 'non-'}empty`, string]>([
      ['empty', await chunkfix('grease', 'feat-cli')],
      ['non-empty', await chunkfix('grease', 'fix-node')]
    ])('should return %s commit body', (_, chunk) => {
      expect(new TestSubject(chunk).body).toMatchSnapshot()
    })
  })

  describe('#breaking', async () => {
    it.each<[boolean, string, string]>([
      [false, 'does not contain', await chunkfix('grease', 'feat-decorators')],
      [true, 'contains', await chunkfix('grease', 'refactor-breaking')]
    ])('should return %j if commit %s breaking changes', (
      expected,
      _,
      chunk
    ) => {
      expect(new TestSubject(chunk).breaking).to.equal(expected)
    })
  })

  describe('#breaks', async () => {
    it.each<[`${EmptyString | 'non-'}empty`, string]>([
      ['empty', await chunkfix('grease', 'feat-decorators')],
      ['non-empty', await chunkfix('grease', 'refactor-breaking')]
    ])('should return %s breaking changes array', (_, chunk) => {
      expect(new TestSubject(chunk).breaks).toMatchSnapshot()
    })
  })

  describe('#date', () => {
    let chunk: string

    beforeAll(async () => {
      chunk = await chunkfix('grease', 'release')
    })

    it('should return commit date', () => {
      expect(new TestSubject(chunk).date).toMatchSnapshot()
    })
  })

  describe('#hash', () => {
    let chunk: string

    beforeAll(async () => {
      chunk = await chunkfix('grease', 'release')
    })

    it('should return abbreviated #sha', () => {
      expect(new TestSubject(chunk).hash).toMatchSnapshot()
    })
  })

  describe('#header', async () => {
    it.each<[`with${EmptyString | 'out'}`, string]>([
      ['with', await chunkfix('grease', 'feat-cli')],
      ['without', await chunkfix('mkbuild', 'initial')]
    ])('should return commit header %s #grammar.header match', (_, chunk) => {
      expect(new TestSubject(chunk).header).toMatchSnapshot()
    })
  })

  describe('#mentions', async () => {
    it.each<[`${EmptyString | 'non-'}empty`, string]>([
      ['empty', await chunkfix('mkbuild', 'docs')],
      ['non-empty', await chunkfix('mkbuild', 'ci')]
    ])('should return %s mentions array', (_, chunk) => {
      expect(new TestSubject(chunk).mentions).toMatchSnapshot()
    })
  })

  describe('#pr', async () => {
    it.each<[string, string]>([
      ['null', await chunkfix('grease', 'fix-node')],
      ['pull request number', await chunkfix('mkbuild', 'feat-pr')]
    ])('should return %s', (_, chunk) => {
      expect(new TestSubject(chunk).pr).toMatchSnapshot()
    })
  })

  describe('#references', async () => {
    it.each<[`${EmptyString | 'non-'}empty`, string]>([
      ['empty', await chunkfix('grease', 'chore')],
      ['non-empty', await chunkfix('mkbuild', 'chore')]
    ])('should return %s reference array', (_, chunk) => {
      expect(new TestSubject(chunk).references).toMatchSnapshot()
    })
  })

  describe('#scope', async () => {
    it.each<[string, string]>([
      ['commit scope', await chunkfix('grease', 'feat-models')],
      ['null', await chunkfix('mkbuild', 'feat')]
    ])('should return %s', (_, chunk) => {
      expect(new TestSubject(chunk).scope).toMatchSnapshot()
    })
  })

  describe('#sha', () => {
    let chunk: string

    beforeAll(async () => {
      chunk = await chunkfix('grease', 'release')
    })

    it('should return commit sha', () => {
      expect(new TestSubject(chunk).sha).toMatchSnapshot()
    })
  })

  describe('#subject', () => {
    let chunk: string

    beforeAll(async () => {
      chunk = await chunkfix('grease', 'feat-models')
    })

    it('should return commit subject', () => {
      expect(new TestSubject(chunk).subject).toMatchSnapshot()
    })
  })

  describe('#tags', async () => {
    it.each<[`${EmptyString | 'non-'}empty`, string]>([
      ['empty', await chunkfix('grease', 'chore-tests')],
      ['non-empty', await chunkfix('grease', 'release')]
    ])('should return %s tags array', (_, chunk) => {
      // Act
      const result = new TestSubject(chunk, repository, { tagprefix }).tags

      // Expect
      expect(result).toMatchSnapshot()
    })
  })

  describe('#toJSON', () => {
    let chunk: string

    beforeAll(async () => {
      chunk = await chunkfix('grease', 'release')
    })

    it('should return json-serializable commit', () => {
      // Act
      const result = new TestSubject(chunk, repository, { tagprefix }).toJSON()

      // Expect
      expect(result).toMatchSnapshot()
    })
  })

  describe('#toString', () => {
    let chunk: string

    beforeAll(async () => {
      chunk = await chunkfix('grease', 'feat-providers')
    })

    it('should return #chunk', () => {
      expect(new TestSubject(chunk).toString()).to.equal(chunk)
    })
  })

  describe('#trailers', async () => {
    it.each<[`${EmptyString | 'non-'}empty`, string]>([
      ['empty', await chunkfix('grease', 'chore')],
      ['non-empty', await chunkfix('grease', 'ci-deps')]
    ])('should return %s trailers array', (_, chunk) => {
      expect(new TestSubject(chunk).trailers).toMatchSnapshot()
    })
  })

  describe('#type', async () => {
    it.each<[`${EmptyString | 'non-'}empty`, string]>([
      ['empty', await chunkfix('mkbuild', 'initial')],
      ['non-empty', await chunkfix('grease', 'build-deps-dev')]
    ])('should return %s commit type', (_, chunk) => {
      expect(new TestSubject(chunk).type).toMatchSnapshot()
    })
  })

  describe('#version', async () => {
    it.each<[string, string]>([
      ['null', await chunkfix('grease', 'chore-tests')],
      ['release tag', await chunkfix('grease', 'release')]
    ])('should return %s', (_, chunk) => {
      // Act
      const result = new TestSubject(chunk, repository, { tagprefix }).version

      // Expect
      expect(result).toMatchSnapshot()
    })
  })
})
