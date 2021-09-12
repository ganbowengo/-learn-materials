"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// object
var obj = { foo: 21, name: 'tom' };
// array
var arr = [1, 2, 3];
var arr1 = [1, 2, 3];
function sum() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.reduce(function (sum, current) { return sum + current; }, 0);
}
// sum([1, 2, '3']) 
// sum([1, 2, 3]) 
// 元组 tuple
var tuple = [1, 'Tom'];
var age = tuple[0];
var name = tuple[1];
var age1 = tuple[0], name2 = tuple[1];
// enum PostStatus {
//     Draft = 0,
//     Unpublished = 1,
//     Published = 2
// }
// 数字类型 不指定值 默认累加
var PostStatus;
(function (PostStatus) {
    PostStatus[PostStatus["Draft"] = 0] = "Draft";
    PostStatus[PostStatus["Unpublished"] = 1] = "Unpublished";
    PostStatus[PostStatus["Published"] = 2] = "Published";
})(PostStatus || (PostStatus = {}));
// 枚举 enum
var post = {
    title: 'TS',
    content: '',
    status: PostStatus.Published // 1 // 0
};
// function
// 声明式
function func1(a, b) {
    if (b === void 0) { b = 0; }
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    return a + b;
}
// 表达式
var func2 = function (a, b) {
    if (b === void 0) { b = 0; }
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    return a + b;
};
var func3 = function (a, b) {
    if (b === void 0) { b = 0; }
    return a + b;
};
// any 弱类型
function stringify(value) {
    return JSON.stringify(value);
}
var foo = 'string';
foo = 21;
// 类型断言
var nums = [1, 2, 3, 4];
var res = nums.find(function (i) { return i > 0; });
var num1 = res;
var num2 = res; // jsx 不能使用
function printPost(post) {
    console.log(post.title);
    console.log(post.content);
}
