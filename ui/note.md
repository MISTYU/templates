## 共用包
`pnpm init @lch/xxx -w`

## 搭建基础结构
* 根目录配置
`pnpm init`
初始化总包的配置
```json
{
  "private": true,
  "description": "",
  "packageManager": "pnpm@7.3.0",
  "workspaces": [
    "packages/*",
    "play",
    "docs"
  ],
  "scripts": {
    "play": "pnpm -C play dev"
  },
  "keywords": [],
  "author": "chengzzz",
  "license": "MIT",
  "devDependencies": {
    "typescript": "^4.7.4",
    "vue": "^3.2.37"
  },
  "dependencies": {
    "@lch/componets": "workspace:^1.0.0",
    "@lch/theme-chalk": "workspace:^1.0.0",
    "@lch/utils": "workspace:^1.0.0"
  },
  "engines": {
    "node": ">= 16"
  },
  "peerDependencies": { // 依赖库
    "vue": "^3.2.0"
  }
}
```
pnpm-workspace.yaml (声明多包)
```yaml
packages:
  - packages/* # 存放编写的组件
  - play
  - docs
```
tsconfig.json

.npmrc
```
shamefully-hoist=true // 平铺 node_modules 下的包处理幽灵依赖
strict-peer-dependencies=false // 如果启用了此选项，那么在依赖树中存在缺失或无效的 peer 依赖关系时，命令将执行失败
```

* 子包配置
packages
`mkdir packages & cd packages & mkdir components & mkdir utils & mkdir theme-chalk`

`cd components & pnpm init`
```json
{
  "name": "@lch/componets",
  "version": "1.0.0",
  "description": "",
  "main": "index.ts",
  "scripts": {
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
共用包
`cd .. & pnpm init @lch/components -w`
utils

theme-chalk

* eslint

* prettier

* vscode

* commit

* changelog