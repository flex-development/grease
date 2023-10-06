/**
 * @file Configuration - Build
 * @module config/build
 */

import { defineBuildConfig, type Config } from '@flex-development/mkbuild'
import pathe from '@flex-development/pathe'
import { at } from '@flex-development/tutils'
import pkg from './package.json' assert { type: 'json' }
import tsconfig from './tsconfig.build.json' assert { type: 'json' }

/**
 * Build configuration options.
 *
 * @const {Config} config
 */
const config: Config = defineBuildConfig({
  charset: 'utf8',
  entries: [
    { dts: 'only', ignore: ['cli/**'] },
    { dts: false, pattern: ['**/enums/*'] },
    {
      dts: false,
      pattern: [
        '**/decorators/*',
        '**/events/*',
        '**/models/*',
        '**/operations/*',
        '**/options/*',
        '**/providers/*',
        '**/queries/*',
        '*.ts',
        'subdomains/**/*.ts'
      ],
      sourcemap: true
    },
    {
      alias: {
        '@flex-development/pathe': '@flex-development/pathe',
        '@flex-development/tutils': '@flex-development/tutils'
      },
      bundle: true,
      external: [
        '@flex-development/mkbuild',
        '@nestjs/microservices',
        '@nestjs/platform-express',
        '@nestjs/websockets/socket-module',
        'cache-manager',
        'class-transformer',
        'node-fetch'
      ],
      minify: true,
      name: 'cli',
      source: 'src/cli/index.ts',
      sourcemap: true,
      sourcesContent: false,
      splitting: true
    }
  ],
  keepNames: true,
  minifySyntax: true,
  platform: 'node',
  sourceRoot: 'file' + pathe.delimiter + pathe.sep.repeat(2),
  target: [
    'node' + at(/([\d.]+)/.exec(pkg.engines.node), 0, ''),
    tsconfig.compilerOptions.target
  ],
  tsconfig: 'tsconfig.build.json'
})

export default config
