import { spawn } from 'child_process'
import { projectRoot } from './path'

export const withTaskName = <T>(name: string, func: T) => Object.assign(func, {
  displayName: name
})

// 在node中使用子进程允许脚本
export const run = (command: string) => {
  return new Promise(resolve => {
    const [cmd, ...args] = command.split(' ')
    const app = spawn(cmd, args, {
      cwd:  projectRoot,
      stdio: 'inherit', // 直接将这个子进程的输出共享给父进程
      shell: true, // 默认情况下 linux 才支持 rm -rf, 其他系统调用 git bash
    })
    app.on('close', resolve)
  })
}
