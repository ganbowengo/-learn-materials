/*
 * @Author       : ganbowen
 * @Date         : 2021-09-10 10:37:57
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-09-10 17:35:37
 * @Descripttion : 
 */
const MyPromise = require('./promise')

const p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功')
    })
    // reject('失败')
}).then(value => {
    console.log('value', value)
    return p
}).then().then(value => {
    console.log('value1', value)
}).catch(reason => {
    console.log('reason', reason)
})

const c = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功')
    })
    // reject('失败')
}).then(value => {
    console.log('Promise + value', value)
    return c
}).then().then(value => {
    console.log('Promise + value1', value)
})