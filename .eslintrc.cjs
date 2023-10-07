/**
 * @file ESLint Configuration - Root
 * @module config/eslint
 * @see https://eslint.org/docs/user-guide/configuring
 */

/**
 * @type {import('eslint').Linter.Config}
 * @const config - ESLint configuration object
 */
const config = {
  extends: ['./.eslintrc.base.cjs'],
  overrides: [
    ...require('./.eslintrc.base.cjs').overrides,
    {
      files: ['src/subdomains/changelog/models/changelog-stream.model.ts'],
      rules: {
        'promise/prefer-await-to-callbacks': 0
      }
    }
  ],
  root: true
}

module.exports = config
