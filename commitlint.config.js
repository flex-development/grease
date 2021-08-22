const { Rule, RuleConfigTuple } = require('@commitlint/types')
const { Record } = require('typescript')

/**
 * @file Commitlint Configuration
 * @see https://commitlint.js.org/#/guides-local-setup
 * @see https://commitlint.js.org/#/reference-configuration
 */

module.exports = {
  /**
   * @property {boolean} defaultIgnores - If true, enable default ignore rules
   */
  defaultIgnores: true,

  /**
   * @property {Array<string>} extends - IDs of commitlint configurations
   */
  extends: ['@commitlint/config-conventional'],

  /**
   * @property {string} formatter - Name of formatter package
   */
  formatter: '@commitlint/format',

  /**
   * Functions that return true if commitlint should ignore the given message.
   *
   * @param {string} commit - The commit message
   * @return {boolean} `true` if commitlint should ignore message
   */
  ignores: [],

  /**
   * @property {Record<string, Rule>} rules - Rules to test commits against
   */
  rules: {
    /**
     * Scope casing.
     */
    'scope-case': [2, 'always', 'kebab-case'],

    /**
     * Rules for valid commit scopes.
     *
     * @return {RuleConfigTuple} Scope rules
     */
    'scope-enum': () => {
      const scopes = [
        'deploy',
        'deps',
        'deps-dev',
        'release',
        'scripts',
        'tests',
        'typescript',
        'workflows'
      ]

      const scopes_package = ['cli', 'node']

      return [
        2,
        'always',
        [
          ...scopes,
          ...scopes_package,
          ...scopes_package.map(ps => scopes.map(s => `${ps}-${s}`)).flat()
        ]
      ]
    },

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
