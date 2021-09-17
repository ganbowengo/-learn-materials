/*
 * @Author       : ganbowen
 * @Date         : 2021-09-14 23:07:39
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-09-14 23:08:47
 * @Descripttion : 
 */
// Plop 入口文件，需要导出一个函数
// 此函数接收一个 plop 对象，用于创建生成器任务

module.exports = plop => {
    plop.setGenerator('component', {
      description: 'create a component',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: 'component name',
          default: 'MyComponent'
        }
      ],
      actions: [
        {
          type: 'add', // 代表添加文件
          path: 'src/components/{{name}}/{{name}}.js',
          templateFile: 'plop-templates/component.hbs'
        },
        {
          type: 'add', // 代表添加文件
          path: 'src/components/{{name}}/{{name}}.css',
          templateFile: 'plop-templates/component.css.hbs'
        },
        {
          type: 'add', // 代表添加文件
          path: 'src/components/{{name}}/{{name}}.test.js',
          templateFile: 'plop-templates/component.test.hbs'
        }
      ]
    })
  }