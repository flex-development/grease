/**
 * @file Functional Tests - IsManifestId
 * @module grease/decorators/tests/functional/IsManifestId
 */

import type { ModuleId } from '@flex-development/mlly'
import { DOT } from '@flex-development/tutils'
import { validate } from 'class-validator'
import { pathToFileURL } from 'node:url'
import IsManifestIdConstraint from '../is-manifest-id.constraint'
import TestSubject from '../is-manifest-id.decorator'

describe('functional:decorators/IsManifestId', () => {
  describe('validation failure', () => {
    it('should fail if property is not manifest module id', async () => {
      // Arrange
      class Model {
        @TestSubject()
        public readonly manifest: unknown = null
      }

      // Act + Expect
      expect((await validate(new Model()))[0]?.constraints).to.eql({
        [IsManifestIdConstraint.options.name]:
          'manifest must be module id of package directory or file'
      })
    })
  })

  describe('validation success', () => {
    describe.each<[string, ModuleId]>([
      ['URL instance', pathToFileURL('package.json').href],
      ['file url', pathToFileURL(DOT)],
      ['path', process.cwd()]
    ])('%s', (_, value) => {
      it('should succeed if property is manifest module id', async () => {
        // Arrange
        class Model {
          @TestSubject()
          public readonly manifest: ModuleId = value
        }

        // Act + Expect
        expect(await validate(new Model())).to.be.an('array').that.is.empty
      })
    })
  })
})
