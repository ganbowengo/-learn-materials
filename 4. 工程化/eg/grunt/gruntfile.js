/*
 * @Author       : ganbowen
 * @Date         : 2021-09-15 14:41:14
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-09-15 18:16:35
 * @Descripttion : 
 */
const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')
module.exports = grunt => {
    grunt.initConfig({
        foo: {
            bar: 123
        },
        // 同任务名相同
        build: {
            options: {
                name: 'build'
            },
            // 任务目标
            css: {
                options: {
                    name: 'build: css'
                }
            },
            js: '2'
        },
        clean: {
            temp: 'temp/**'
        },
        sass: {
            options: {
                sourceMap: true,
                implementation: sass
            },
            main: {
                files: {
                    'dist/css/main.css': 'src/scss/main.scss'
                }
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            main: {
                files: {
                    'dist/js/app.js': 'src/js/app.js'
                }
            }
        },
        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: ['babel']
            },
            css: {
                files: ['src/scss/*.scss'],
                tasks: ['sass']
            }
        }
    })

    // grunt.loadNpmTasks('grunt-contrib-clean')
    // grunt.loadNpmTasks('grunt-sass')
    // grunt.loadNpmTasks('grunt-babel')
    loadGruntTasks(grunt) // 自动加载所有的grunt插件
    
    grunt.registerTask('foo', '任务描述-foo', () => {
        console.log('pramas:', grunt.config('foo'))
        console.log('foo start')
    })

    grunt.registerTask('bar', '任务描述-bar', () => {
        console.log('bar start')
    })

    grunt.registerTask('task-async', '任务描述-bar', function() {
        const done = this.async()
        setTimeout(() => {
            console.log('task-async start')
            done()
        }, 1000)
    })

    grunt.registerTask('bad', '失败-bar', () => {
        console.log('bad start')
        return false
    })

    grunt.registerTask('bad-async', '失败-async', () => {
        const done = this.async()
        setTimeout(() => {
            console.log('bad async start')
            done(false)
        }, 1000)
    })

    grunt.registerMultiTask('build', '多目标任务，根据配置形成多个子任务', function () {
        console.log('build start', this.options(), this.target, this.data)
    })

    grunt.registerTask('default', '默认执行任务', ['foo', 'task-async', 'bad', 'bar', 'bad-async', 'sass', 'babel', 'watch'])
}