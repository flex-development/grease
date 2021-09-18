import DTO from '@grease/tests/fixtures/create-release-dto.fixture'
import join from 'lodash/join'
import pick from 'lodash/pick'
import TestSubject from '../create-release.dto'

/**
 * @file Functional Tests - CreateReleaseDTO
 * @module grease/dtos/tests/functional/CreateRelease
 */

const mockJoin = join as jest.MockedFunction<typeof join>
const mockPick = pick as jest.MockedFunction<typeof pick>

describe('functional:dtos/CreateReleaseDTO', () => {
  describe('#constructor', () => {
    it('should pick CreateReleaseDTO properties from data', () => {
      // Arrange
      const data = { ...DTO, foo: 'data!' }

      // Act
      new TestSubject(data)

      // Expect
      expect(mockPick).toBeCalledTimes(1)
      expect(mockPick).toBeCalledWith(data, TestSubject.PROPS)
    })
  })

  describe('#toString', () => {
    const Subject = new TestSubject(DTO)
    const spy_toStringArgs = jest.spyOn(Subject, 'toStringArgs')

    beforeEach(() => {
      Subject.toString()
    })

    it('should get string arguments', () => {
      expect(spy_toStringArgs).toBeCalledTimes(1)
    })

    it('should join string arguments', () => {
      expect(mockJoin).toBeCalledTimes(1)
      expect(mockJoin).toBeCalledWith(Subject.toStringArgs(), ' ')
    })
  })
})
