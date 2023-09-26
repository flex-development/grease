/**
 * @file Unit Tests - GitCommitOptions
 * @module grease/git/options/tests/unit/GitCommitOptions
 */

import { Commit } from '#src/git/models'
import CommitGrammarOptions from '../commit-grammar.options'
import TestSubject from '../git-commit.options'

describe('unit:git/options/GitCommitOptions', () => {
  describe('constructor', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject()
    })

    it('should set #Commit', () => {
      expect(subject).to.have.property('Commit', Commit)
    })

    it('should set #from', () => {
      expect(subject).to.have.property('from', '')
    })

    it('should set #grammar', () => {
      expect(subject)
        .to.have.deep.property('grammar', new CommitGrammarOptions())
    })

    it('should set #to', () => {
      expect(subject).to.have.property('to', 'HEAD')
    })
  })
})
