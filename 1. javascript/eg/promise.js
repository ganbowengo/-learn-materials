/*
 * @Author       : ganbowen
 * @Date         : 2021-09-09 21:44:08
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-09-10 17:36:47
 * @Descripttion : Promise
 */

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    status = PENDING
    value = undefined
    reason = undefined
    onFulfilledCallback = undefined
    onRejectedCallback = undefined
    constructor (executor) {
        executor(this.resolve, this.reject)
    }

    resolve = value => {
        if(this.status !== PENDING) return
        this.status = FULFILLED
        this.value = value
        this.onFulfilledCallback && this.onFulfilledCallback()  
    }

    reject = reason => {
        if(this.status !== PENDING) return
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCallback && this.onRejectedCallback()  
    }

    catch (onRejected) {
        return this.then(undefined, onRejected)
    }

    then (onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
        let promise2 = new MyPromise((resolve, reject) => {
            const fulfilledMicrotask = () => {
                process.nextTick(_ => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            const rejectedMicrotask = () => {
                process.nextTick(_ => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }

            if (this.status === FULFILLED) {
                fulfilledMicrotask()
            } else if (this.status === REJECTED) {
                rejectedMicrotask()
            } else {
                this.onFulfilledCallback = fulfilledMicrotask
                this.onRejectedCallback = rejectedMicrotask
            }
        })
        return promise2
    }
}

function resolvePromise(promsie2, x, resolve, reject) {
    if(promsie2 === x) {
        return reject(new TypeError('循环调用'))
    }
    if(x instanceof MyPromise) {
        x.then(resolve, reject)
    } else {
        resolve(x)
    }
}

module.exports = MyPromise