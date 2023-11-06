/**
 * @file Unit Tests - createGreaser
 * @module grease/tests/unit/createGreaser
 */

import testSubject from '../grease.create'
import GreaseService from '../grease.service'

describe('unit:createGreaser', () => {
  it('should return grease runner instance', async () => {
    expect(await testSubject()).to.be.instanceof(GreaseService)
  })
})
