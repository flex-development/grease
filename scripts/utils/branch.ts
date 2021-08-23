import exec from './exec'

/**
 * @file Script Utility - Get Current Branch
 * @module scripts/utils/branch
 */

export default exec('git rev-parse --abbrev-ref HEAD', false)
