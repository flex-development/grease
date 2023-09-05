/**
 * @file Functional Tests - PackageService
 * @module grease/providers/tests/functional/PackageService
 */

import { lookupPackageScope } from '@flex-development/mlly'
import { DOT } from '@flex-development/tutils'
import TestSubject from '../package.service'

describe('functional:providers/PackageService', () => {
  describe('#init', () => {
    it('should set #scope', () => {
      expect(new TestSubject().init(DOT))
        .to.have.deep.property('scope', lookupPackageScope(DOT))
        .be.frozen
    })
  })
})
