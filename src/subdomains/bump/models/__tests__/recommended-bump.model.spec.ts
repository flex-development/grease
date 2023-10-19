/**
 * @file Unit Tests - RecommendedBump
 * @module grease/bump/models/tests/unit/RecommendedBump
 */

import type { IRecommendedBump } from '#src/bump/interfaces'
import { ReleaseType } from '#src/enums'
import type { Omit } from '@flex-development/tutils'
import TestSubject from '../recommended-bump.model'

describe('unit:bump/models/RecommendedBump', () => {
  let commits: number

  beforeAll(() => {
    commits = faker.number.int({ max: 100, min: 25 })
  })

  describe('constructor', () => {
    describe.each<[
      keyof typeof ReleaseType,
      Omit<IRecommendedBump, 'bump' | 'commits'>
    ]>([
      ['MAJOR', {
        breaks: faker.number.int({ max: commits, min: 1 }),
        features: faker.number.int({ max: commits, min: 2 }),
        unstable: false
      }],
      ['MINOR', {
        breaks: 0,
        features: faker.number.int({ max: commits, min: 3 }),
        unstable: false
      }],
      ['PATCH', {
        breaks: 0,
        features: 0,
        unstable: false
      }],
      ['PREMAJOR', {
        breaks: faker.number.int({ max: commits, min: 1 }),
        features: faker.number.int({ max: commits, min: 2 }),
        unstable: true
      }],
      ['PREMINOR', {
        breaks: 0,
        features: faker.number.int({ max: commits, min: 3 }),
        unstable: true
      }],
      ['PREPATCH', {
        breaks: 0,
        features: 0,
        unstable: true
      }]
    ])('ReleaseType.%s', (key, data) => {
      let subject: TestSubject

      beforeAll(() => {
        subject = new TestSubject({ ...data, commits })
      })

      it('should set #breaks', () => {
        expect(subject).to.have.property('breaks', data.breaks)
      })

      it('should set #bump', () => {
        expect(subject).to.have.property('bump', ReleaseType[key])
      })

      it('should set #commits', () => {
        expect(subject).to.have.property('commits', commits)
      })

      it('should set #features', () => {
        expect(subject).to.have.property('features', data.features)
      })

      it('should set #unstable', () => {
        expect(subject).to.have.property('unstable', data.unstable)
      })
    })
  })

  describe('#toJSON', () => {
    it('should return json-serializable recommendation', () => {
      // Arrange
      const data: Omit<IRecommendedBump, 'bump'> = {
        breaks: 1,
        commits: 72,
        features: 16,
        unstable: true
      }

      // Act + Expect
      expect(new TestSubject(data)).toMatchSnapshot()
    })
  })
})
