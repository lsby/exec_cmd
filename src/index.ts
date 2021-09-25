import * as child_process from 'child_process'
import os from 'os'

function 字符串转数组(s: string) {
    return s
        .toString()
        .replace(/\r/g, '')
        .split('\n')
        .filter((a) => a != '' && a != null)
}

export default function fun(cmd: string, opt?: child_process.ExecSyncOptionsWithStringEncoding): string[] {
    cmd = cmd.trim().replace(/  /g, ' ')
    if (os.type() == 'Windows_NT') {
        cmd = 'chcp 65001 && ' + cmd
    }
    try {
        var 结果 = child_process.execSync(cmd, {
            encoding: 'utf8',
            ...opt,
        })
    } catch (e) {
        throw 字符串转数组(e as string)
    }

    return 字符串转数组(结果)
}
