/**
 * @file Unit Tests - CommitType
 * @module grease/changelog/models/tests/unit/CommitType
 */

import type { ICommitType } from '#src/changelog/interfaces'
import { Type } from '@flex-development/commitlint-config'
import { fallback, isFalsy } from '@flex-development/tutils'
import TestSubject from '../commit-type.model'

describe('unit:changelog/models/CommitType', () => {
  describe('constructor', () => {
    it('should set #hidden', () => {
      // Arrange
      const cases: ConstructorParameters<typeof TestSubject>[] = [
        [{ section: ':sparkles: Features', type: Type.FEAT }],
        [{ section: '', type: Type.TEST }],
        [{ hidden: true, type: Type.RELEASE }]
      ]

      // Act + Expect
      cases.forEach(([opts]) => {
        const result = new TestSubject(opts)
        const hidden = opts.hidden ?? isFalsy(opts.section)

        expect(result).to.have.property('hidden', hidden)
      })
    })

    it('should set #section', () => {
      // Arrange
      const cases: ConstructorParameters<typeof TestSubject>[] = [
        [{ section: ':white_check_mark: Testing', type: Type.TEST }],
        [{ hidden: true, type: Type.RELEASE }]
      ]

      // Act + Expect
      cases.forEach(([opts]) => {
        const result = new TestSubject(opts)
        const type = result.type

        expect(result).to.have.property('section', fallback(opts.section, type))
      })
    })

    it('should set #type', () => {
      // Arrange
      const opts: ICommitType = {
        section: ':mechanical_arm: Refactors',
        type: Type.REFACTOR
      }

      // Act + Expect
      expect(new TestSubject(opts)).to.have.property('type', opts.type)
    })
  })
})
