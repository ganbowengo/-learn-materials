/*
 * @Author       : ganbowen
 * @Date         : 2021-09-12 20:24:47
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-09-12 20:32:42
 * @Descripttion : 
 */
import { camelCase } from 'lodash'
import qs from 'query-string'

// ts的补充声明
// declare function camelCase(params: string): string

const params = qs.parse('?value=1&data=12')
const res = camelCase('hello typed')