import { GH_RELEASE_CREATE } from '@grease/config/constants.config'
import { ExitCode } from '@grease/enums/exit-code.enum'
import sh from 'shelljs'
import TestSubject from '../greaser.lifecycle'

/**
 * @file Unit Tests - Greaser
 * @module grease/lifecycles/tests/unit/Greaser
 */

const mockSH = sh as jest.Mocked<typeof sh>

describe('unit:lifecycles/greaser', () => {
  beforeEach(async () => {
    await TestSubject({ version: '3.13.98-rc.6.40' })
  })

  it(`should execute ${GH_RELEASE_CREATE} command`, () => {
    expect(mockSH.exec).toBeCalledTimes(1)
    expect(mockSH.exec.mock.calls[0][0]).toMatch(GH_RELEASE_CREATE)
  })

  it('should force shell to exit', () => {
    expect(mockSH.exit).toBeCalledTimes(1)
    expect(mockSH.exit).toBeCalledWith(ExitCode.SUCCESS)
  })
})
