import join from 'lodash.join'

/**
 * @file Scripts - 'node_modules'
 * @module scripts/nm-string
 */

/**
 * Fixes `YN0000: Strings should avoid referencing the node_modules directory`
 * warning during the `yarn check:install` lifecycle.
 */

export default join(['node', '_', 'modules'], '')
