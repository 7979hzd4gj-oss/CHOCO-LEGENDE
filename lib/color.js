import chalk from 'chalk'
export const color = (text, col) => {
  return !col ? chalk.green(text) : chalk.keyword(col)(text)
}