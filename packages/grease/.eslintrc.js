const baseConfig = require('../../.eslintrc.base')

/**
 * @file ESLint Configuration
 * @see https://eslint.org/docs/user-guide/configuring
 */

const RULES_SPELLCHECKER = baseConfig.rules['spellcheck/spell-checker']

module.exports = {
  root: true,
  extends: ['../../.eslintrc.base'],
  rules: {
    'spellcheck/spell-checker': [
      RULES_SPELLCHECKER[0],
      {
        ...RULES_SPELLCHECKER[1],
        skipWords: RULES_SPELLCHECKER[1].skipWords.concat([
          'autogeneration',
          'boop',
          'cmd',
          'depchecker',
          'dtag',
          'dto',
          'dtos',
          'enums',
          'esmrc',
          'explicitly',
          'gitdir',
          'infile',
          'lifecycles',
          'lookups',
          'msg',
          'namespace',
          'nullish',
          'postdepchecker',
          'postgreaser',
          'postnotes',
          'predepchecker',
          'pregreaser',
          'prenotes',
          'prepend',
          'prerelease',
          'repo',
          'stringified',
          'strinigify',
          'updaters',
          'utf8',
          'versioning'
        ])
      }
    ]
  },
  overrides: baseConfig.overrides.concat([
    {
      files: ['**/*.spec.ts'],
      rules: {
        'no-empty': 0
      }
    },
    {
      files: ['src/services/logger.service.ts'],
      rules: {
        'prefer-spread': 0
      }
    },
    {
      files: ['src/typings/shell-quote/index.d.ts'],
      rules: {
        'jsdoc/no-undefined-types': [
          1,
          {
            definedTypes: ['Env', 'ParseOptions', 'ParsedShellCommand']
          }
        ]
      }
    }
  ])
}
