/*
 * @Author       : ganbowen
 * @Date         : 2021-09-15 17:53:53
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-09-15 18:15:52
 * @Descripttion : 
 */
const main = (options) => {
    options = Object.assign({
        name: 'Tom',
        age: 21
    }, options)
    console.log('start', options)
}