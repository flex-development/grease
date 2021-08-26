import dtag from '@flex-development/dtag'
import type { IGreaseOptions } from '@grease/interfaces'
import type { TestcaseCalled } from '@tests/utils/types'
import { mocked } from 'ts-jest/utils'
import testSubject from '../get-prerelease.util'

/**
 * @file Functional Tests - getPrerelease
 * @module grease/utils/tests/functional/getPrerelease
 */

jest.mock('@flex-development/dtag')

const mockDtag = mocked(dtag)

describe('functional:utils/getPrerelease', () => {
  type Case = TestcaseCalled & {
    options: IGreaseOptions
    state: string
    version: any
  }

  const cases: Case[] = [
    {
      call: 'call',
      expected: 1,
      options: {
        prerelease: undefined,
        prereleaseMap: new Map([['rc', 'next']]),
        tagPrefix: 'foo-pkg@'
      },
      state: 'options.prerelease === undefined',
      version: 'foo-pkg@26.0.0-rc.13'
    },
    {
      call: 'not call',
      expected: 0,
      options: { prerelease: '' },
      state: 'options.prerelease === empty string',
      version: 'v3.13.98-dev.640'
    },
    {
      call: 'not call',
      expected: 0,
      options: { prerelease: 'next', tagPrefix: 'foo@' },
      state: 'options.prerelease && options.prerelease.length',
      version: 'foo@2.0.0-rc.1'
    }
  ]

  it.each<Case>(cases)('should $call dtag if $state', testcase => {
    // Arrange
    const { expected, options, version } = testcase
    const calledWith = {
      delimiter: options.prereleaseDelimiter,
      map: Object.fromEntries(options.prereleaseMap?.entries() ?? []),
      skip: options.prereleaseSkip,
      tagPrefix: options.tagPrefix,
      version
    }

    // Act
    testSubject(options, version)

    // Expect
    expect(mockDtag).toBeCalledTimes(expected)
    // eslint-disable-next-line jest/no-conditional-expect
    expected && expect(mockDtag).toBeCalledWith(calledWith)
  })
})
