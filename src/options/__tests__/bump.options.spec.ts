/**
 * @file Unit Tests - BumpOptions
 * @module grease/options/tests/unit/BumpOptions
 */

import { ReleaseType } from '#src/enums'
import { DOT } from '@flex-development/tutils'
import { pathToFileURL } from 'node:url'
import TestSubject from '../bump.options'

describe('unit:options/BumpOptions', () => {
  describe('constructor', () => {
    let manifest: TestSubject['manifest']
    let preid: TestSubject['preid']
    let prestart: TestSubject['prestart']
    let release: TestSubject['release']
    let silent: TestSubject['silent']
    let subject: TestSubject
    let write: TestSubject['write']

    beforeAll(() => {
      subject = new TestSubject({
        manifest: (manifest = pathToFileURL(DOT).href),
        preid: (preid = 'rc'),
        prestart: (prestart = 0),
        release: (release = ReleaseType.PREMAJOR),
        silent: (silent = true),
        write: (write = true)
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
