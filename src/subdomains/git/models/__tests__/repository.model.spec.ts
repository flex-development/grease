/**
 * @file Unit Tests - Repository
 * @module grease/git/models/tests/unit/Repository
 */

import { RepositoryProvider } from '#src/git/enums'
import { DOT, ifelse, template } from '@flex-development/tutils'
import TestSubject from '../repository.model'

describe('unit:git/models/Repository', () => {
  let owner: string

  beforeAll(() => {
    owner = 'flex-development'
  })

  describe('constructor', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject()
    })

    it('should set #owner', () => {
      expect(subject).to.have.property('owner', owner)
    })

    it('should set #provider', () => {
      expect(subject).to.have.property('provider', RepositoryProvider.GITHUB)
    })

    it('should set #repo', () => {
      expect(subject).to.have.property('repo', 'grease')
    })
  })

  describe('#host', () => {
    describe.each<[provider: keyof typeof RepositoryProvider, tld: string]>([
      ['BITBUCKET', 'org'],
      ['GITHUB', 'com'],
      ['GITLAB', 'com']
    ])('RepositoryProvider.%s', (key, tld) => {
      let provider: RepositoryProvider
      let remote: string

      beforeAll(() => {
        remote = template('https://{provider}.{tld}/{owner}/{repo}', {
          owner,
          provider: provider = RepositoryProvider[key],
          repo: 'grease',
          tld: ifelse(key === 'BITBUCKET', 'org', 'com')
        })
      })

      it('should return repository provider hostname', () => {
        // Act
        const subject = new TestSubject(remote)

        // Expect
        expect(subject).to.have.property('host', provider + DOT + tld)
      })
    })
  })

  describe('#keywords', () => {
    describe.each<[provider: keyof typeof RepositoryProvider, pr: string]>([
      ['BITBUCKET', 'pull-requests'],
      ['GITHUB', 'issues'],
      ['GITLAB', 'merge_requests']
    ])('RepositoryProvider.%s', (key, pr) => {
      let remote: string

      beforeAll(() => {
        remote = template('{provider}:{owner}/{repo}', {
          owner,
          provider: RepositoryProvider[key],
          repo: 'mkbuild'
        })
      })

      it('should return repository keywords object', () => {
        expect(new TestSubject(remote)).to.have.deep.property('keywords', {
          commit: 'commit',
          issue: 'issues',
          pr
        })
      })
    })
  })

  describe('#toString', () => {
    describe.each<keyof typeof RepositoryProvider>([
      'BITBUCKET',
      'GITHUB',
      'GITLAB'
    ])('RepositoryProvider.%s', key => {
      let provider: RepositoryProvider
      let remote: string
      let repo: string
      let tld: string

      beforeAll(() => {
        remote = template('{provider}:{owner}/{repo}', {
          owner,
          provider: provider = RepositoryProvider[key],
          repo: repo = 'tutils'
        })

        tld = ifelse(key === 'BITBUCKET', 'org', 'com')
      })

      it('should return repository url', () => {
        // Act
        const result = new TestSubject(remote).toString()

        // Expect
        expect(result).to.equal(template('{host}/{owner}/{repo}', {
          host: template('https://{provider}.{tld}', { provider, tld }),
          owner,
          repo
        }))
      })
    })
  })
})
