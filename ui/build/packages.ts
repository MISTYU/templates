import { dest, parallel, series, src } from "gulp"
import path from "path"
import { buildConfig } from "./utils/config"
import { outDir, projectRoot } from "./utils/path"
import gulpTs from 'gulp-typescript'
import { withTaskName } from "./utils"
// 专门打包 utils, 指令, hooks
export const buildPackages = (dirname: string, name: string) => {
  // 打包的格式：cjs es
  const tasks = Object.entries(buildConfig).map(([module, config]) => {
    const output = path.resolve(dirname, config.output.name)
    return series(
      withTaskName(`build:${dirname}`, () => {
        const tsConfig = path.resolve(projectRoot, 'tsconfig.json')
        const inputs = ['**/*ts', '!gulpfile.ts', '!node_modules']
        return src(inputs)
          .pipe(gulpTs.createProject(tsConfig, {
            declaration: true, // 需要生成的声明文件
            strict: false,
            module: config.module
          })())
          .pipe(dest(output))
      }),
      withTaskName(`copy:${config.output.name}`, () => {
        return src(`${output}/**`)
          // 放到 es -> utils 和 lib -> utils
          // 将 utils 模块放到 dist 目录下的 es lib
          .pipe(dest(path.resolve(outDir, config.output.name, name)))
      })
    )
  })

  return parallel(...tasks)
}

