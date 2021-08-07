const merge = require('lodash').merge
const rootConfig = require('../../.eslintrc')

/**
 * @file ESLint Configuration
 * @see https://eslint.org/docs/user-guide/configuring
 */

module.exports = merge(rootConfig, {
  parserOptions: {
    project: ['./tsconfig.json']
  }
})
