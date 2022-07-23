import type { App, Plugin } from 'vue'

// 类型必须导出，否则无法生成 .d.ts 文件
export type SFCWithInstall<T> = Plugin & T & {
  name?: string
}

export const withInstall = <T>(component: T): SFCWithInstall<T> => {
  (component as SFCWithInstall<T>).install = function(app: App) {
    app.component((component as SFCWithInstall<T>).name!, component)
  }
  return component as SFCWithInstall<T>
}
