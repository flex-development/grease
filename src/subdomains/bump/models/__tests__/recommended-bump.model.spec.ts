/**
 * @file Unit Tests - RecommendedBump
 * @module grease/bump/models/tests/unit/RecommendedBump
 */

import { ReleaseType } from '#src/enums'
import TestSubject from '../recommended-bump.model'

describe('unit:bump/models/RecommendedBump', () => {
  let commits: number

  beforeAll(() => {
    commits = 26
  })

  describe('constructor', () => {
    describe.each<[
      'MAJOR' | 'MINOR' | 'PATCH',
      Omit<TestSubject, 'bump' | 'commits'>
    ]>([
      ['MAJOR', {
        breaks: faker.number.int({ max: commits, min: 1 }),
        features: faker.number.int({ max: commits, min: 2 })
      }],
      ['MINOR', {
        breaks: 0,
        features: faker.number.int({ max: commits, min: 3 })
      }],
      ['PATCH', { breaks: 0, features: 0 }]
    ])('ReleaseType.%s', (key, data) => {
      let commits: number
      let subject: TestSubject

      beforeAll(() => {
        subject = new TestSubject({ ...data, commits: commits = 26 })
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
    })
  })
})
