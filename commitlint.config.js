/**
 * @file Commitlint Configuration
 * @see https://commitlint.js.org/#/guides-local-setup
 * @see https://commitlint.js.org/#/reference-configuration
 */

module.exports = {
  /**
   * Enable default ignore rules.
   */
  defaultIgnores: true,

  /**
   * IDs of commitlint configurations.
   */
  extends: ['@commitlint/config-conventional'],

  /**
   * Name of formatter package.
   */
  formatter: '@commitlint/format',

  /**
   * Functions that return true if commitlint should ignore the given message.
   */
  ignores: [],

  /**
   * Rules to test commits against.
   *
   * @see https://commitlint.js.org/#/reference-rules
   */
  rules: {
    /**
     * Scope casing.
     */
    'scope-case': [2, 'always', 'kebab-case'],

    /**
     * Commit scopes.
     */
    'scope-enum': [
      2,
      'always',
      [
        'deploy',
        'deps',
        'deps-dev',
        'deps-peer',
        'release',
        'scripts',
        'tests',
        'typescript',
        'workflows',
        'yarn',
        ...require('./scripts/workspaces')()
      ]
    ],

    /**
     * Commit message subject casing.
     */
    'subject-case': [1, 'always', 'lower-case'],

    /**
     * Rules for valid commit types.
     */
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test'
      ]
    ]
  }
}
