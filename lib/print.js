import chalk from 'chalk'
export function printLog(type, msg) {
  const time = new Date().toLocaleTimeString()
  if (type === 'success') console.log(chalk.green(`[${time}] ✅ ${msg}`))
  else if (type === 'error') console.log(chalk.red(`[${time}] ❌ ${msg}`))
  else console.log(chalk.cyan(`[${time}] ℹ️ ${msg}`))
}