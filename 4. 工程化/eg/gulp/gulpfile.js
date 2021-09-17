/*
 * @Author       : ganbowen
 * @Date         : 2021-09-15 18:21:02
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-09-16 21:01:37
 * @Descripttion : gulp 配置文件
 */
// 入口文件
const fs = require('fs')
const { series, parallel, src, dest } = require('gulp')
const { Transform } = require('stream')
const cleanCss  =require('gulp-clean-css')
const rename = require('gulp-rename')
exports.default = done => {
    return src('src/css/index.css')
    .pipe(cleanCss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('dist'))
}

exports.start = done => {
    console.log('task - start')
    done()
}

// exports.default = done => {
//     const readStream = fs.createReadStream('test.css')
//     const writeStream = fs.createWriteStream('test.min.css')
//     const transform = new Transform({
//         transform: (chunk, encoding, callback) => {
//             const input = chunk.toString()
//             const ouput = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g,'')
//             callback(null, ouput)
//         }
//     })
//     readStream.pipe(transform).pipe(writeStream)
//     return readStream
// }

// gulp.task('bar', done => {
//     console.log('task - bar')
//     done()
// })

exports.promise = () => {
    console.log('task - Promise')
    return Promise.resolve()
}

const timeout = (time) => {
    console.log('task - async - await')
    return new Promise(resolve =>{ 
        setTimeout(resolve, time)
    })
}
exports.async = async () => {
    await timeout(3000)
}

exports.stream = () => {
    const readStream = fs.createReadStream('./package.json')
    const writeStream = fs.createWriteStream('temp.txt')
    readStream.pipe(writeStream)
    return readStream
}

exports.stream1 = (done) => {
    const readStream = fs.createReadStream('./package.json')
    const writeStream = fs.createWriteStream('temp.txt')
    readStream.pipe(writeStream)
    readStream.on('end', () => {
        done()
    })
}

const task1 =  done => {
    setTimeout(_=>{
        console.log('task1 - default')
        done()
    }, 1000)
}

const task2 =  done => {
    setTimeout(_=>{
        console.log('task2 - default')
        done()
    }, 1000)
}

const task3 =  done => {
    setTimeout(_=>{
        console.log('task3 - default')
        done()
    }, 1000)
}

// 串行
exports.async1 = series(task1, task2, task3)
// 并行
exports.sync1 = parallel(task1, task2, task3)