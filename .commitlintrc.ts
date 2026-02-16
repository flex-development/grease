/**
 * @file Configuration - commitlint
 * @module config/commitlint
 * @see https://commitlint.js.org
 */

import {
  RuleConfigSeverity as Severity,
  type UserConfig
} from '@commitlint/types'
import { scopes } from '@flex-development/commitlint-config'

/**
 * `commitlint` configuration object.
 *
 * @const {UserConfig} config
 */
const config: UserConfig = {
  extends: ['@flex-development'],
  rules: {
    'scope-enum': [Severity.Error, 'always', scopes([
      'bump',
      'changelog',
      'chore',
      'cli',
      'config',
      'git',
      'grease',
      'log',
      'nestjs',
      'options',
      'symbol'
    ])]
  }
}

export default config
