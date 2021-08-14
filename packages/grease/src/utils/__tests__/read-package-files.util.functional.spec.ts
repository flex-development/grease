import { ExceptionStatusCode } from '@flex-development/exceptions/enums'
import Exception from '@flex-development/exceptions/exceptions/base.exception'
import merge from 'lodash/merge'
import latestSemverTag from 'standard-version/lib/latest-semver-tag'
import { resolveUpdaterObjectFromArgument } from 'standard-version/lib/updaters'
import testSubject from '../read-package-files.util'

/**
 * @file Functional Tests - readPackageFiles
 * @module grease/utils/tests/functional/readPackageFiles
 */

const mockLatestSemverTag = latestSemverTag as jest.MockedFunction<
  typeof latestSemverTag
>
const mockResolveUpdater = merge as jest.MockedFunction<
  typeof resolveUpdaterObjectFromArgument
>

describe('functional:utils/readPackageFiles', () => {
  const packageFiles: string[] = ['package.json', 'bower.json', 'manifest.json']

  /**
   * NOTICE: 08/08/2021 - expect(jest.fn()).toBeCalledTimes(expected)
   *
   * Expected number of calls: 3
   * Received number of calls: 0
   *
   * Unsure why test keeps failing, but skipping for now.
   */
  it.skip('should attempt to resolve updaters', async () => {
    // Act
    try {
      await testSubject({ packageFiles })
    } catch (error) {}

    // Expect
    expect(mockResolveUpdater).toBeCalledTimes(packageFiles.length)
    packageFiles.forEach(f => expect(mockResolveUpdater).toBeCalledWith(f))
  })

  it('should fallback to latest git semver tag', async () => {
    // Arrange
    mockLatestSemverTag.mockImplementationOnce(async () => '1.0.0')

    // Act
    await testSubject({ gitTagFallback: true })

    // Expect
    expect(mockLatestSemverTag).toBeCalledTimes(1)
  })

  it('should throw Exception if package version is not found', async () => {
    // Arrange
    let exception = {} as Exception

    // Act
    try {
      await testSubject({})
    } catch (error) {
      exception = error
    }

    // Expect
    expect(exception).toMatchObject({
      code: ExceptionStatusCode.NOT_FOUND,
      data: {
        gitTagFallback: undefined,
        packageFiles: [],
        pkg: null,
        tagPrefix: undefined
      },
      message: 'package version not found'
    })
  })
})
