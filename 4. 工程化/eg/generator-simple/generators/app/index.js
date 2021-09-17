/*
 * @Author       : ganbowen
 * @Date         : 2021-09-14 22:41:54
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-09-14 22:45:57
 * @Descripttion : 
 */
const Genarator = require('yeoman-generator')

module.exports = class extends Genarator{
    writing () {
        this.fs.write(
            this.destinationPath('temp.txt'),
            Math.random().toString()
        )
    }
}