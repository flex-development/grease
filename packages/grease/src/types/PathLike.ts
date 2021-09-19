import type fs from 'fs'

/**
 * @file Type Definitions - PathLike
 * @module grease/types/PathLike
 */

/**
 * Valid file paths.
 */
/* eslint-disable-next-line @typescript-eslint/ban-types */
export type PathLike = fs.PathLike | String
