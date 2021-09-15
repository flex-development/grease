const { lstatSync, readdirSync } = require('fs')
const { resolve } = require('path')

/**
 * @file Scripts - Workspaces
 * @module scripts/workspaces
 */

/**
 * Returns an array containing Yarn workspace directory names.
 *
 * @return {string[]} Array containing workspace directory names
 */
const workspaces = () => {
  // Yarn project names
  const projects = ['packages']

  /**
   * Returns an array containing Yarn workspaces listed under `project`.
   *
   * @param {string} project - Yarn project directory
   * @return {string[]} Yarn workspaces listed under `project`
   */
  const callback = project => {
    // Get path to Yarn project directory
    const path = resolve(process.env.PROJECT_CWD, project)

    // Add subdirectories under Yarn project directory
    return readdirSync(path).filter(workspace => {
      if (!lstatSync(resolve(path, workspace)).isDirectory()) return
      return workspace
    })
  }

  // Return workspace directory names
  return projects.map(callback).flat()
}

module.exports = workspaces
