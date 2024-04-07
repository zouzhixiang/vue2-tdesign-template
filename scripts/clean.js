
const chalk = require('chalk')
const rimraf = require('rimraf')

const log = console.log

log(chalk.blue('开始清理>>>>>>>>>>>>>>'))

rimraf.sync('node_modules')
rimraf.sync('dist')

log(chalk.green('-------清理成功-------'))
