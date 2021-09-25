import 'mocha'
import lib from '../dist/'
import * as tools from '@lsby/js_tools'

describe('测试组', async function () {
    it('测试1', function () {
        var r = lib(['ls'])
        tools.断言相等(r.includes('tsconfig.json'), true)
    })
    it('测试2', function () {
        var r = lib(['cd test && ls'])
        tools.断言相等(r.includes('index.test.ts'), true)
    })
    it('测试3', function () {
        try {
            lib(['cd aaa'], { encoding: 'utf8' })
        } catch (e) {
            return tools.断言相等((e as string[]).includes('The system cannot find the path specified.'), true)
        }
        throw '不应该到这里'
    })
})
