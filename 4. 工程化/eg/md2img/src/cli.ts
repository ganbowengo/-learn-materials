/*
 * @Author       : ganbowen
 * @Date         : 2021-09-23 18:00:15
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-09-23 18:17:38
 * @Descripttion : 
 */
import cac from 'cac'
const {name, version} = require('../package.json')

const cli = cac(name as string)
cli.command('<input>', 'Convert markdown to image')
    .option('-o, --output <output>', 'output filename')