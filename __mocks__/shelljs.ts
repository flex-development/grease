/**
 * @file Node Module Mock - shelljs
 * @module mocks/shelljs
 * @see https://jestjs.io/docs/manual-mocks#mocking-node-modules
 * @see https://github.com/shelljs/shelljs
 */

export default {
  ShellString: jest.requireActual('shelljs').ShellString,
  config: {
    fatal: false,
    globOptions: {},
    maxdepth: 255,
    noglob: false,
    silent: false,
    verbose: false
  },
  exec: jest.fn().mockReturnValue({ stdout: '' }),
  exit: jest.fn(),
  which: jest.fn()
}
