import ch from 'chalk'
import figures from 'figures'
import sh from 'shelljs'

/**
 * @file Shell Logger
 * @module scripts/echo
 */

/**
 * Logs a message.
 *
 * @param {string} message - Log message
 * @param {boolean} [bold=false] - If `true`, bold message
 * @param {string} [color='white'] - Log color
 * @param {keyof typeof figures} [figure=ch.green(figures.tick)] - Symbol
 * @return {void}
 */
const echo = (
  message: string,
  bold: boolean = false,
  color: string = 'white',
  figure: keyof typeof figures | string = ch.green(figures.tick)
): void => {
  const chalk = bold ? ch.bold : ch
  const symbol = ch.bold(figures[figure] || figure)

  sh.echo(chalk[color](`${symbol} ${message}`.trim()))
}

export default echo
