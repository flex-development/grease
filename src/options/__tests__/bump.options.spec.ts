/**
 * @file Unit Tests - BumpOptions
 * @module grease/options/tests/unit/BumpOptions
 */

import { DOT } from '@flex-development/tutils'
import { pathToFileURL } from 'node:url'
import TestSubject from '../bump.options'

describe('unit:options/BumpOptions', () => {
  describe('constructor', () => {
    let manifest: TestSubject['manifest']
    let preid: Required<TestSubject>['preid']
    let prestart: TestSubject['prestart']
    let release: TestSubject['release']
    let silent: TestSubject['silent']
    let subject: TestSubject
    let write: TestSubject['write']

    beforeAll(() => {
      manifest = pathToFileURL(DOT).href
      preid = 'rc'
      prestart = 0
      release = 'premajor'
      silent = true
      write = true

      subject = new TestSubject({
        manifest,
        preid,
        prestart,
        release,
        silent,
        write
      })
    })

    it('should set #manifest', () => {
      expect(subject).to.have.deep.property('manifest', manifest)
    })

    it('should set #preid', () => {
      expect(subject).to.have.property('preid', preid)
    })

    it('should set #prestart', () => {
      expect(subject).to.have.property('prestart', prestart)
    })

    it('should set #release', () => {
      expect(subject).to.have.property('release', release)
    })

    it('should set #silent', () => {
      expect(subject).to.have.property('silent', silent)
    })

    it('should set #write', () => {
      expect(subject).to.have.property('write', write)
    })
  })
})
