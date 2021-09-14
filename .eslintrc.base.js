const prettierConfig = require('./.prettierrc')

/**
 * @file ESLint Configuration - Base
 * @see https://eslint.org/docs/user-guide/configuring
 */

module.exports = {
  env: {
    es2017: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:jsdoc/recommended'
  ],
  globals: {},
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    babelOptions: {},
    ecmaFeatures: {
      impliedStrict: true,
      jsx: false
    },
    project: ['./packages/**/tsconfig.json', './tsconfig.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    warnOnUnsupportedTypeScriptVersion: true
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'jsdoc',
    'markdown',
    'spellcheck',
    'tree-shaking'
  ],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/ban-types': 1,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/member-delimiter-style': [
      2,
      {
        multiline: {
          delimiter: 'none',
          requireLast: false
        }
      }
    ],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-useless-constructor': 1,
    '@typescript-eslint/no-var-requires': 1,
    eqeqeq: 1,
    'import/no-anonymous-default-export': 0,
    'jsdoc/check-indentation': 1,
    'jsdoc/check-line-alignment': 1,
    'jsdoc/check-syntax': 1,
    'jsdoc/check-tag-names': [1, { definedTags: ['link'] }],
    'jsdoc/no-multi-asterisks': 0,
    'jsdoc/no-undefined-types': [
      1,
      {
        definedTypes: [
          'Exception',
          'ExceptionJSON',
          'NodeJS',
          'ValidationException',
          'never',
          'unknown'
        ]
      }
    ],
    'jsdoc/require-hyphen-before-param-description': 1,
    'jsdoc/require-throws': 1,
    'jsdoc/tag-lines': [
      1,
      'any',
      {
        count: 1,
        noEndLines: false,
        tags: {}
      }
    ],
    'no-ex-assign': 0,
    'prefer-arrow-callback': 2,
    'prettier/prettier': [2, prettierConfig],
    'sort-keys': [
      1,
      'asc',
      {
        caseSensitive: true,
        minKeys: 2,
        natural: true
      }
    ],
    'space-before-function-paren': [
      2,
      {
        anonymous: 'always',
        asyncArrow: 'always',
        named: 'never'
      }
    ],
    'spellcheck/spell-checker': [
      2,
      {
        comments: true,
        identifiers: false,
        lang: 'en_US',
        minLength: 3,
        skipIfMatch: [],
        skipWordIfMatch: [],
        skipWords: [
          'anymatch',
          'argv',
          'changelog',
          'cjs',
          'cmp',
          'commitlint',
          'copyfiles',
          'dotenv',
          'enum',
          'esm',
          'formatter',
          'globals',
          'jira',
          'jsdoc',
          'keyof',
          'lerna',
          'negit',
          'nullish',
          'perf',
          'pnv',
          'prerelease',
          'readonly',
          'rebase',
          'rimraf',
          'sem',
          'semver',
          'shas',
          'tgz',
          'tsconfig',
          'ttsc',
          'ttypescript',
          'tutils',
          'typeof',
          'usr',
          'ver',
          'wip',
          'workspace',
          'yargs',
          'zsh'
        ],
        strings: true
      }
    ]
  },
  overrides: [
    {
      files: ['**/.eslintrc.*'],
      rules: {
        'spellcheck/spell-checker': 0
      }
    },
    {
      files: ['**/.eslintrc.*', '**/webpack.*'],
      rules: {
        'sort-keys': 0
      }
    },
    {
      files: ['**/*.md'],
      processor: 'markdown/markdown'
    },
    {
      files: ['**/*.md/*.ts'],
      parser: require.resolve('@typescript-eslint/parser')
    },
    {
      files: ['**/*.js', '**/*.md/*.js'],
      parser: `${__dirname}/node_modules/@babel/eslint-parser/lib/index.cjs`,
      parserOptions: {
        requireConfigFile: false
      },
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-var-requires': 0
      }
    },
    {
      files: ['**/*.spec.ts'],
      env: {
        jest: true
      },
      extends: ['plugin:jest/recommended'],
      globals: {
        'jest/globals': true
      },
      rules: {
        'jest/no-disabled-tests': 0,
        'jest/valid-title': 0,
        'tree-shaking/no-side-effects-in-initialization': 0
      }
    },
    {
      files: ['**/typings/**'],
      rules: {
        '@typescript-eslint/ban-types': 0,
        '@typescript-eslint/triple-slash-reference': 0
      }
    },
    {
      files: ['**/*interface.ts'],
      rules: {
        'jsdoc/check-indentation': 0
      }
    },
    {
      files: [
        '**/__mocks__/**',
        '**/__tests__/**',
        '**/scripts/**',
        '**/.eslintrc.*',
        '**/babel.*',
        'commitlint.*',
        'jest.*',
        'lint-staged.*',
        'webpack.*'
      ],
      rules: {
        'tree-shaking/no-side-effects-in-initialization': 0
      }
    }
  ],
  settings: {
    'import/parsers': {
      [require.resolve('@typescript-eslint/parser')]: ['.d.ts', '.ts']
    },
    'import/resolver': {
      [require.resolve('eslint-import-resolver-node')]: {
        extensions: ['.ts'],
        moduleDirectory: ['node_modules', 'packages/*/src']
      },
      [require.resolve('eslint-import-resolver-typescript')]: {
        alwaysTryTypes: true,
        project: ['./packages/*/tsconfig.json', './tsconfig.json']
      }
    },
    jsdoc: {
      augmentsExtendsReplacesDocs: true,
      implementsReplacesDocs: true,
      mode: 'typescript',
      overrideReplacesDocs: true,
      structuredTags: {
        param: {
          required: ['name', 'type']
        },
        throws: {
          name: 'namepath-defining',
          required: ['type']
        }
      },
      tagNamePreference: {
        augments: 'extends',
        constant: 'const',
        returns: 'return'
      }
    }
  }
}
