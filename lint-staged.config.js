/**
 * @file Lint Staged Configuration
 * @see https://github.com/okonet/lint-staged
 */

module.exports = {
  /**
   * Formatting and linting commands for all files.
   */
  [`*.{js,json,md,ts}`]: ['yarn fix:format', 'git add -A'],

  /**
   * Formatting and linting commands for JavaScript and TypeScript files.
   */
  [`*.{js,md,ts}`]: ['yarn fix:style', 'git add -A']
}
