import * as child_process from 'child_process'
import os from 'os'

function 字符串转数组(s: string) {
    return s
        .toString()
        .replace(/\r/g, '')
        .split('\n')
        .filter((a) => a != '' && a != null)
        .filter((a) => a != 'Active code page: 65001')
}

export default function fun(cmd: string[], opt?: child_process.ExecSyncOptionsWithStringEncoding): string[] {
    var cmd = cmd.map((a) => a.trim().replace(/  /g, ' '))
    if (os.type() == 'Windows_NT') {
        cmd.unshift('chcp 65001')
    }
    try {
        var 结果 = child_process.execSync(cmd.join(' && '), {
            encoding: 'utf8',
            ...opt,
        })
    } catch (e) {
        var ex = e as any
        throw 字符串转数组([ex.stdout, ex.stderr].join('\n'))
    }

    return 字符串转数组(结果)
}
