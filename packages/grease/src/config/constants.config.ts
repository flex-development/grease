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
