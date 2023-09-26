/**
 * @file Unit Tests - CommitGrammarOptions
 * @module grease/git/options/tests/unit/CommitGrammarOptions
 */

import tagprefix from '#fixtures/git/grease/tagprefix'
import { RepositoryProvider } from '#src/git/enums'
import { ifelse } from '@flex-development/tutils'
import TestSubject from '../commit-grammar.options'

describe('unit:git/options/CommitGrammarOptions', () => {
  describe('constructor', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject()
    })

    it('should set #provider', () => {
      expect(subject).to.have.property('provider', RepositoryProvider.GITHUB)
    })

    it('should set #tagprefix', () => {
      expect(subject).to.have.property('tagprefix', '')
    })

    describe.each<keyof typeof RepositoryProvider>([
      'BITBUCKET',
      'GITHUB',
      'GITLAB'
    ])('RepositoryProvider.%s', key => {
      let provider: RepositoryProvider
      let subject: TestSubject

      beforeAll(() => {
        subject = new TestSubject({
          issues: ['#'],
          pr: [ifelse(key === 'GITLAB', '!', '#')],
          provider: provider = RepositoryProvider[key],
          tagprefix
        })
      })

      it('should set #actions', () => {
        expect(subject).to.have.property('actions')
        expect(subject.actions).toMatchSnapshot()
      })

      it('should set #issues', () => {
        expect(subject).to.have.property('issues')
        expect(subject.issues).toMatchSnapshot()
      })

      it('should set #pr', () => {
        expect(subject).to.have.property('pr')
        expect(subject.pr).toMatchSnapshot()
      })

      it('should set #provider', () => {
        expect(subject).to.have.property('provider', provider)
      })
    })
  })
})
