"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author       : ganbowen
 * @Date         : 2021-09-23 18:00:15
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-09-23 18:30:07
 * @Descripttion :
 */
const cac_1 = __importDefault(require("cac"));
const { name, version } = require('../package.json');
const cli = cac_1.default(name);
cli.command('<input>', 'Convert markdown to image')
    .option('-o, --output <output>', 'output filename');

console.log('123', version)
cli.help().version(version).parse()