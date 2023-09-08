/**
 * @file Functional Tests - IsReleaseVersion
 * @module grease/decorators/tests/functional/IsReleaseVersion
 */

import { ReleaseType } from '#src/enums'
import type { SemanticVersion } from '@flex-development/pkg-types'
import { cast } from '@flex-development/tutils'
import { validate } from 'class-validator'
import IsReleaseVersionConstraint from '../is-release-version.constraint'
import TestSubject from '../is-release-version.decorator'

describe('functional:decorators/IsReleaseVersion', () => {
  describe('validation failure', () => {
    it('should fail if property is not release type or version', async () => {
      // Arrange
      class Model {
        @TestSubject()
        public readonly release: unknown = 0
      }

      // Act + Expect
      expect((await validate(new Model()))[0]?.constraints).to.eql({
        [IsReleaseVersionConstraint.options.name]:
          'release must be a release type or semantic version'
      })
    })
  })

  describe('validation success', () => {
    it.each<keyof typeof ReleaseType>([
      'MAJOR',
      'MINOR',
      'PATCH',
      'PREMAJOR',
      'PREMINOR',
      'PREPATCH',
      'PRERELEASE'
    ])('should succeed if property is ReleaseType.%s', async key => {
      // Arrange
      class Model {
        @TestSubject()
        public readonly release: ReleaseType = ReleaseType[key]
      }

      // Act + Expect
      expect(await validate(new Model())).to.be.an('array').that.is.empty
    })

    it('should succeed if property is semantic version', async () => {
      // Arrange
      class Model {
        @TestSubject()
        public readonly release: SemanticVersion = cast(faker.system.semver())
      }

      // Act + Expect
      expect(await validate(new Model())).to.be.an('array').that.is.empty
    })
  })
})
