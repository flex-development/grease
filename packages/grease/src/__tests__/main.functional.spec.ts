import { ExceptionStatusCode } from '@flex-development/exceptions/enums'
import Exception from '@flex-development/exceptions/exceptions/base.exception'
import defaults from '@grease/config/defaults.config'
import depchecker from '@grease/lifecycles/depchecker.lifecycle'
import greaser from '@grease/lifecycles/greaser.lifecycle'
import notes from '@grease/lifecycles/notes.lifecycle'
import GreaseOptions from '@grease/models/grease-options.model'
import cacheOptions from '@grease/utils/cache-options.util'
import getPrerelease from '@grease/utils/get-prerelease.util'
import logger from '@grease/utils/logger.util'
import readPackageFiles from '@grease/utils/read-package-files.util'
import anymatch from 'anymatch'
import { currentBranch } from 'isomorphic-git'
import merge from 'lodash/merge'
import bump from 'standard-version/lib/lifecycles/bump'
import changelog from 'standard-version/lib/lifecycles/changelog'
import commit from 'standard-version/lib/lifecycles/commit'
import tag from 'standard-version/lib/lifecycles/tag'
import runLifecycleScript from 'standard-version/lib/run-lifecycle-script'
import testSubject from '../main'

/**
 * @file Functional Tests - Main Method
 * @module grease/tests/functional/main
 */

jest.mock('@grease/lifecycles/depchecker.lifecycle')
jest.mock('@grease/lifecycles/greaser.lifecycle')
jest.mock('@grease/lifecycles/notes.lifecycle')
jest.mock('@grease/utils/cache-options.util')
jest.mock('@grease/utils/get-prerelease.util')
jest.mock('@grease/utils/logger.util')
jest.mock('@grease/utils/read-package-files.util')

const mockAnymatch = anymatch as jest.MockedFunction<typeof anymatch>
const mockBump = bump as jest.MockedFunction<typeof bump>
const mockCacheOptions = cacheOptions as jest.MockedFunction<
  typeof cacheOptions
>
const mockChangelog = changelog as jest.MockedFunction<typeof changelog>
const mockCommit = commit as jest.MockedFunction<typeof commit>
const mockCurrentBranch = currentBranch as jest.MockedFunction<
  typeof currentBranch
>
const mockDepchecker = depchecker as jest.MockedFunction<typeof depchecker>
const mockGetPrerelease = getPrerelease as jest.MockedFunction<
  typeof getPrerelease
>
const mockGreaser = greaser as jest.MockedFunction<typeof greaser>
const mockLogger = logger as jest.MockedFunction<typeof logger>
const mockNotes = notes as jest.MockedFunction<typeof notes>
const mockReadPackageFiles = readPackageFiles as jest.MockedFunction<
  typeof readPackageFiles
>
const mockRunLifecycleScript = runLifecycleScript as jest.MockedFunction<
  typeof runLifecycleScript
>
const mockTag = tag as jest.MockedFunction<typeof tag>

describe('functional:main', () => {
  const OPTIONS: GreaseOptions = merge({}, defaults, {
    prerelease: undefined,
    prereleaseMap: new Map([['rc', 'next']]),
    releaseBranchWhitelist: ['BRANCH'],
    scripts: { prerelease: 'bash scripts/release-assets' },
    tagPrefix: 'foo-pkg@'
  })

  const $OPTS = {
    ...OPTIONS,
    prereleaseMap: new Map(Object.entries(OPTIONS.prereleaseMap || {}))
  }

  beforeAll(() => {
    mockCacheOptions.mockImplementation(async options => options)
  })

  it('should log and throw Exceptions', async () => {
    // Arrange
    // @ts-expect-error Expected 1 arguments, but got 0
    const branch = await mockCurrentBranch()
    let exception = {} as Exception

    // Act
    try {
      await testSubject($OPTS)
    } catch (error) {
      exception = error as Exception
    }

    // Expect
    expect(mockLogger).toBeCalledTimes(1)
    expect(exception).toMatchObject({
      code: ExceptionStatusCode.CONFLICT,
      data: { releaseBranchWhitelist: $OPTS.releaseBranchWhitelist },
      errors: { branch },
      message: `${branch} not included in release branch whitelist`
    })
  })

  describe('runs without throwing', () => {
    beforeEach(async () => {
      mockBump.mockImplementationOnce(async () => '2.0.0')
      mockCurrentBranch.mockImplementation(async () => {
        return $OPTS.releaseBranchWhitelist?.[0] as string
      })

      await testSubject($OPTS)
    })

    it('should cache application options', () => {
      expect(mockCacheOptions).toBeCalledTimes(1)
      expect(mockCacheOptions).toBeCalledWith($OPTS)
    })

    it('should check release branch whitelist', () => {
      expect(mockCurrentBranch).toBeCalledTimes(1)
      expect(mockCurrentBranch).toBeCalledWith({
        dir: defaults.gitdir,
        fs: expect.anything()
      })

      expect(mockAnymatch).toBeCalledTimes(1)
      expect(mockAnymatch).toBeCalledWith(
        $OPTS.releaseBranchWhitelist,
        expect.anything()
      )
    })

    it('should run prerelease and postrelease scripts', () => {
      expect(mockRunLifecycleScript).toBeCalledTimes(2)
      expect(mockRunLifecycleScript).toBeCalledWith($OPTS, 'prerelease')
      expect(mockRunLifecycleScript.mock.calls[0][1]).toBe('prerelease')
      expect(mockRunLifecycleScript).toBeCalledWith($OPTS, 'postrelease')
      expect(mockRunLifecycleScript.mock.calls[1][1]).toBe('postrelease')
    })

    it('should read package files', () => {
      expect(mockReadPackageFiles).toBeCalledTimes(1)
      expect(mockReadPackageFiles).toBeCalledWith($OPTS)
    })

    it('should set prerelease', () => {
      expect(mockGetPrerelease).toBeCalledTimes(1)
      expect(mockGetPrerelease).toBeCalledWith($OPTS, expect.anything())
    })

    it('should run lifecycle events', () => {
      // Arrange
      const options_bump = merge({}, $OPTS, { scripts: { prerelease: null } })

      // Expect
      expect(mockBump).toBeCalledTimes(1)
      expect(mockBump).toBeCalledWith(options_bump, expect.anything())
      expect(mockChangelog).toBeCalledTimes(1)
      expect(mockChangelog).toBeCalledWith($OPTS, expect.anything())
      expect(mockCommit).toBeCalledTimes(1)
      expect(mockCommit).toBeCalledWith($OPTS, expect.anything())
      expect(mockDepchecker).toBeCalledTimes(1)
      expect(mockDepchecker).toBeCalledWith($OPTS)
      expect(mockGreaser).toBeCalledTimes(1)
      expect(mockGreaser).toBeCalledWith($OPTS, expect.anything())
      expect(mockNotes).toBeCalledTimes(1)
      expect(mockNotes).toBeCalledWith($OPTS, expect.anything())
      expect(mockTag).toBeCalledTimes(1)
      expect(mockTag).toBeCalledWith(expect.anything(), false, $OPTS)
    })
  })
})
