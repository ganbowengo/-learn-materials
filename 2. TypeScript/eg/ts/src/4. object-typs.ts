/*
 * @Author       : ganbowen
 * @Date         : 2021-09-12 16:15:58
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-09-12 20:23:58
 * @Descripttion : 
 */
export {} 
// object
const obj: {
    foo: number,
    name: string
} = {foo: 21, name: 'tom'}

// array
const arr: Array<number> = [1, 2, 3]
const arr1: number[] = [1, 2, 3]

function sum(...args: Array<number>) {
    return args.reduce((sum, current) => sum + current, 0)
}

// sum([1, 2, '3']) 
// sum([1, 2, 3]) 

// 元组 tuple

const tuple: [number, string] = [1, 'Tom']
const age = tuple[0]
const name = tuple[1]
const [age1, name2] = tuple


// enum PostStatus {
//     Draft = 0,
//     Unpublished = 1,
//     Published = 2
// }
// 数字类型 不指定值 默认累加
enum PostStatus {
    Draft,
    Unpublished,
    Published
}

// 枚举 enum
const post = {
    title: 'TS',
    content: '',
    status: PostStatus.Published // 1 // 0
}

// function
// 声明式
function func1 (a: number, b: number = 0, ...rest: number[]): number {
    return a + b
}

// 表达式
const func2 =  function (a: number, b: number = 0, ...rest: number[]): number {
    return a + b
}

const func3: (a: number, b: number) => number  =  function (a: number, b: number = 0): number {
    return a + b
}

// any 弱类型
function stringify(value: any) {
    return JSON.stringify(value)
}

let foo: any = 'string'
foo = 21

// 类型断言
const nums = [1, 2, 3, 4]
const res = nums.find(i => i > 0)

const num1 = res as number
const num2 = <number>res // jsx 不能使用


// 接口 Interfaces  - 表述一种约束
interface Post {
    title: string
    content: string,
    subtitle?: string, // 可有可无
    readonly summary: string
}

function printPost (post: Post) {
    console.log(post.title)
    console.log(post.content)
}

printPost({
    title: 'TS',
    content: 'content',
    summary: 'a JavaScript'
})


const hello: Post = {
    title: 'TS',
    content: 'content',
    summary: 'a JavaScript'
} 

// hello.summary = 'hello' // 报错

// 动态属性
interface Cache {
    [key: string]: string
}

// class
class Person {
    // name: string = 'name'
    public name: string // 默认public
    private age: number // 不能在外部访问
    protected readonly gender: boolean // 只允许在子类中访问   readonly只能在声明是初始化 或 构造函数中初始化
    constructor (name: string, age: number) {
        this.name = name
        this.age = age
        this.gender = true
    }

    sayHi(msg: string): void {
        console.log(`I'm ${this.name},age is ${this.age}, ${msg}`)
    }
}

const tom = new Person('tom', 21)
// tom.age // error
// tom.gender // error

class Student extends Person {
    // private 不能访问 不能实例化 不能继承 protected 可以继承
    private constructor(name: string, age: number) {
        super(name,age)
        console.log(this.gender)
    }

    static create (name: string, age: number) {
        return new Student(name, age)
    }
}

const jack = Student.create('jack', 20)

// class AND interface

interface Eat {
    eat(food: string): void
   
}

interface Run {
    run(distance: number): void
}

class Animal1 implements Eat, Run {
    eat (food: string): void {
        console.log('eat', food)
    }

    run (distance: number): void {
        console.log('run', distance)
    }
}

// 抽象类 只能被继承
abstract class Animal implements Eat, Run {
    eat (food: string): void {
        console.log('eat', food)
    }
    abstract run(distance: number): void
}

class Dog extends Animal {
    run (distance: number): void {
        console.log('run', distance)
    }
}

// 泛型
function createNumberArray (length: number, value:number): number[] {
    const arr = Array<number>(length).fill(value)
    return arr
}

function createArray<T> (length: number, value: T): T[] {
    const arr = Array<T>(length).fill(value)
    return arr
}

const array = createNumberArray(3, 100)
const arrayForStr = createArray<string>(3, '00')

