#!/usr/bin/env node

/**
 * @file CLI Entry Point
 * @module grease/cli
 */

import pkg from '#pkg' assert { type: 'json' }
import { ProgramFactory } from '@flex-development/nest-commander'
import ProgramModule from './program.module'

await (await ProgramFactory.create(ProgramModule, {
  error: ProgramModule.error.bind(ProgramModule),
  exit: ProgramModule.exit.bind(ProgramModule),
  positional: false,
  version: pkg.version
})).run()
