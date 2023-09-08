/**
 * @file Configuration - Build
 * @module config/build
 */

import { defineBuildConfig, type Config } from '@flex-development/mkbuild'
import pathe from '@flex-development/pathe'
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
    { dts: false, pattern: ['enums/*'] },
    {
      dts: false,
      pattern: [
        '*.ts',
        'decorators/**',
        'models/**',
        'options/**',
        'providers/**'
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
        '@nestjs/microservices',
        '@nestjs/platform-express',
        '@nestjs/websockets/socket-module',
        'cache-manager',
        'node-fetch',
        'rxjs'
      ],
      minify: true,
      name: 'cli',
      platform: 'node',
      source: 'src/cli/index.ts',
      sourcemap: true,
      sourcesContent: false
    }
  ],
  keepNames: true,
  minifySyntax: true,
  sourceRoot: 'file' + pathe.delimiter + pathe.sep.repeat(2),
  target: [
    pkg.engines.node.replace(/^\D+/, 'node'),
    tsconfig.compilerOptions.target
  ],
  tsconfig: 'tsconfig.build.json'
})

export default config
