import { lstatSync, readdirSync } from 'fs'
import path from 'path'
import { workspaces as GLOBS } from '../package.json'

/**
 * @file Scripts - Workspaces
 * @module scripts/workspaces
 */

/**
 * Returns an array containing Yarn workspace directory names.
 *
 * @return {string[]} Array containing workspace directory names
 */
const workspaces = (): string[] => {
  return GLOBS.map(g => g.split('/')[0]).flatMap((proj: string): string[] => {
    // Get path to Yarn project directory
    const proj_path = path.resolve(process.env.PROJECT_CWD as string, proj)

    // Add subdirectories under Yarn project directory
    return readdirSync(proj_path).filter(workspace => {
      if (!lstatSync(path.resolve(proj_path, workspace)).isDirectory()) return
      return workspace
    })
  })
}

export default workspaces
