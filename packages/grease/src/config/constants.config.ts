import type { SemanticVersion, TVODefaults } from '@grease/types'

/**
 * @file Configuration - Constant Values
 * @module grease/config/constants
 */

/**
 * @property {string} GH_RELEASE_CREATE - Command to create releases via GH CLI
 * @see https://cli.github.com/manual/gh_release_create
 */
export const GH_RELEASE_CREATE = 'gh release create'

/**
 * @property {string} GREASER_NOTES_BIRTHDAY - `Greaser#notes` birthday format
 */
export const GREASER_NOTES_BIRTHDAY = `## Overview
\n
<!-- Package overview -->
\n
## Features
\n
\n
-
-
-
\n
`

/**
 * @property {string} GREASER_NOTES_BLANK - `Greaser#notes` blank format
 */
export const GREASER_NOTES_BLANK = ''

/**
 * @property {string} GREASER_NOTES_NULL - `Greaser#notes` null format
 */
export const GREASER_NOTES_NULL = null

/**
 * @property {string} GREASER_TITLE_BIRTHDAY - Birthday release title substring
 */
export const GREASER_TITLE_BIRTHDAY = '(🎂 First Release)'

/**
 * @property {string} LINE_BREAK - Line break
 */
export const LINE_BREAK = '\n'

/**
 * @property {string} RELEASE_PATTERN - `CHANGELOG` release heading pattern
 */
export const RELEASE_PATTERN = /(^#+ \[?[0-9]+\.[0-9]+\.[0-9]+|<a name=)/gm

/**
 * @property {SemanticVersion} DEFAULT_VERSION - Package version placeholder
 * Forces NOT_FOUND Exception or ValidationException
 */
export const DEFAULT_VERSION = 'x.x.x' as unknown as SemanticVersion

/**
 * @property {TVODefaults} TVO_DEFAULTS - `class-transformer-validator` options
 * @see https://github.com/MichalLytek/class-transformer-validator
 */
export const TVO_DEFAULTS: TVODefaults = Object.freeze({
  transformer: {},
  validator: {
    enableDebugMessages: true,
    forbidNonWhitelisted: true,
    stopAtFirstError: false,
    validationError: { target: false, value: true },
    whitelist: false
  }
})
