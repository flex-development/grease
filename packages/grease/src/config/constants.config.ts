import type { TVODefaults } from '@grease/types'

/**
 * @file Configuration - Constant Values
 * @module grease/config/constants
 */

/**
 * @property {string} CHANGELOG_HEADING_PATTERN - `CHANGELOG` heading pattern
 */
export const CHANGELOG_HEADING_PATTERN =
  /(^#+ \[?[0-9]+\.[0-9]+\.[0-9]+|<a name=)/gm

/**
 * @property {string} DEBUG_NAMESPACE - Name of `debug` namespace
 * @see https://github.com/visionmedia/debug
 */
export const DEBUG_NAMESPACE = 'grease'

/**
 * @property {string} DEBUG_NAMESPACE_COLOR - `debug` namespace color
 * @see https://github.com/visionmedia/debug#namespace-colors
 */
export const DEBUG_NAMESPACE_COLOR = '111111111111'

/**
 * @property {string} GREASER_NOTES_BIRTHDAY - `Greaser#notes` birthday format
 */
export const GREASER_NOTES_BIRTHDAY = `## Overview
\n
<!-- Package overview -->
\n
\n
\n
\n
## Features
\n
-
-
-
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
 * @property {TVODefaults} TVO_DEFAULTS - `class-transformer-validator` options
 * @see https://github.com/MichalLytek/class-transformer-validator
 */
export const TVO_DEFAULTS: TVODefaults = Object.freeze({
  transformer: {},
  validator: {
    enableDebugMessages: true,
    forbidNonWhitelisted: true,
    stopAtFirstError: false,
    validationError: { target: true, value: true },
    whitelist: false
  }
})
