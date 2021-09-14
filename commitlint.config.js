const { RuleConfigTuple } = require('@commitlint/types')
const { lstatSync, readdirSync } = require('fs')
const { resolve } = require('path')

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
     * Returns the rules for valid commit scopes.
     *
     * @return {RuleConfigTuple} Scope rules
     */
    'scope-enum': () => {
      /**
       * Returns an array containing Yarn workspace directory names.
       *
       * @return {string[]} Array containing workspace directory names
       */
      const workspaceDirectories = () => {
        // Yarn project names
        const projects = ['packages']

        // Init array of workspace directory names
        const workspaces = []

        // Get subdirectories
        projects.forEach(project => {
          // Get path to Yarn project directory
          const path = resolve(__dirname, project)

          // Add subdirectories under Yarn project directory
          readdirSync(path).forEach(workspace => {
            if (!lstatSync(resolve(path, workspace)).isDirectory()) return
            return workspaces.push(workspace)
          })
        })

        // Return workspace directory names
        return workspaces
      }

      const scopes = [
        'deploy',
        'deps',
        'deps-dev',
        'deps-peer',
        'release',
        'scripts',
        'tests',
        'typescript',
        'yarn'
      ]

      const workspaces = workspaceDirectories()

      return [
        2,
        'always',
        [
          ...scopes,
          ...workspaces,
          ...workspaces.map(d => scopes.map(s => `${d}-${s}`)).flat(),
          'workflows'
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
