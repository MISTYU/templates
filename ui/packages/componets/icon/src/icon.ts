// 这里主要放置的是组件的props，及一些公共方法
import type { ExtractPropTypes } from "vue"

export const iconProps = {
  size: {
    type: Number
  },
  color: {
    type: String
  }
}

export type IconProps = ExtractPropTypes<typeof iconProps> // 提取 props
