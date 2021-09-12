/*
 * @Author       : ganbowen
 * @Date         : 2021-09-10 20:57:22
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-09-10 22:34:51
 * @Descripttion : 
 */
const str = console.log`hello world`

const name = 'tom'
const gender = true

function mytagFunction(string, name, gender) {
    console.log('string', string, name, gender)
}
mytagFunction`${name} is a ${gender}`

const source = {
    a: 111,
    b: 123
}
const source1 = {
    a: 1112,
    b: 12
}
const source2 = {
    a: 1112,
    b: 1234
}
// Object.assgin
console.log('obj', Object.assign(source, source1, source2))
// Object.is
console.log('NaN', NaN === NaN, Object.is(NaN, NaN))
console.log('NaN', +0 === -0, Object.is(+0, -0))
// Proxy
const person = {
    name: 'tom',
    age: 20
}

const PersonProxy = new Proxy(person, {
    get(target, property) {
        return property in target ? target[property] : 'default'
    },
    set(target, property, value) {
        if(property === 'age') {
            if(!Number.isInteger(value)) {
                throw new TypeError(`${property} must number`)
            }
        }
        target[property] = value
    }
})

// Reflect
const list = []
const listProxy = new Proxy(list, {
    set(target, property, value) {
        console.log('set', property, value)
        return Reflect.set(target, property, value)
    }
})
listProxy[0] = 'tony'
listProxy.push(0)

// iterator
const obj = {
    store: [1, 2, 3],
    [Symbol.iterator]: function() {
        let index = 0
        let self = this
        return {
            next: function() {
                result = {
                    value: self.store[index],
                    done: index >= self.store.length
                }
                index++
                return result
            }
        }
    }
}

// 迭代器模式
// 场景：协同开发任务清单应用
const todos = {
    life: ['吃饭', '睡觉'],
    learn: ['语文', '数学', '英文'],
    work: ['喝茶'],
    each: function(cb) {
        const all = [].concat(this.life, this.learn, this.work)
        for(const item of all){
            cb(item)
        }
    },
    // [Symbol.iterator]: function() {
    //     const all = [...this.learn, ...this.life, ...this.work]
    //     let index = 0
    //     return {
    //         next: function() {
    //             return {
    //                 value: all[index],
    //                 done: index++ >= all.length
    //             }
    //         }
    //     }
    // },
    // Generator 生成器函数
    [Symbol.iterator]: function * () {
        const all = [...this.learn, ...this.life, ...this.work]
        for(const item of all) {
            yield item
        }
    }
}