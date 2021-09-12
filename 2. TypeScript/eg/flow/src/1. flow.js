/*
 * @Author       : ganbowen
 * @Date         : 2021-09-11 10:37:41
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-09-12 15:40:07
 * @Descripttion : 
 */
// @flow
function sum (a: number, b: number) {
    return a + b
}

sum(100, 200)
sum(1, 2)

const num: number = 1
const str: string = '1'
const bool: boolean = true
const nu: null = null
const un1: void = undefined
const syboml: symbol = Symbol('syboml')


const arr: Array<number> = []
const arr1: number[] = []
const arr2: [number, string] = [1, 'tom']
const obj: { [string]: string } = {}
const obj1: { name: string, age?: number } = {
    name: 'tom',
    age: 12
}

function foo(callback: (string, ?number) => void) {
    callback('name', 12)
}

// 特殊类型字面量
const a: 'foo' = 'foo'
const type: 'warning' | 'success' | 'danger' = 'warning'
const b: string | number = 'xiaozhang' // 21
type StringOrNumber = string | number
const c: StringOrNumber = 'xiaozhang' // 21
const gender: ?number = null // undefined // 21
// mixed | any
// mixed 与 any的差异 mixed强类型、 any弱类型
function passMixed(value: mixed) {
    // 先明确类型 再使用
    if (typeof value === 'string') {

    }

    if (typeof value === 'number') {
        
    }
    // value = value * value // 报错
}

function passMixed(value: any) {
    // 不需要明确类型
    value.substr(1)
    value = value * value
}

const element: HTMLElement | null = document.getElementById('app')