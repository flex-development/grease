/**
 * @file Functional Tests - PackageManifest
 * @module grease/models/tests/functional/PackageManifest
 */

import type { Spy } from '#tests/interfaces'
import fs from 'node:fs'
import TestSubject from '../manifest-package.model'

describe('functional:models/PackageManifest', () => {
  let subject: TestSubject

  beforeAll(() => {
    subject = new TestSubject()
  })

  describe('#write', () => {
    let data: string
    let writeFileSync: Spy<typeof fs['writeFileSync']>

    beforeAll(() => {
      data = JSON.stringify(subject.pkg, null, 2) + '\n'
    })

    beforeEach(() => {
      writeFileSync = vi
        .spyOn(fs, 'writeFileSync')
        .mockImplementationOnce(vi.fn().mockName('fs.writeFileSync'))
    })

    it('should write package data to #file', () => {
      // Act
      subject.write()

      // Expect
      expect(writeFileSync).toHaveBeenCalledOnce()
      expect(writeFileSync).toHaveBeenCalledWith(subject.file, data)
    })
  })
})
