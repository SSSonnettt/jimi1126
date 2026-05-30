---
title: '使用vue过程遇到的问题'
description: 'Duplicate declaration “h“ (This is an error on an internal node. Probably an inter)'
published: 2021/5/24
head:
  meta:
    - name: 'keywords'
      content: 'vue, vue-cli3, Duplicate declaration “h“, require-object-coercible.js'
---

1、 Duplicate declaration “h“ (This is an error on an internal node. Probably an inter)

vue-cli3 以后已经内置支持 jsx，babel-loader 无需配置 jsx 支持

2、 require-object-coercible.js?1d80:3 Uncaught TypeError: Can't call m

```shell
ethod on undefined
at module.exports (require-object-coercible.js?1d80:3)
at module.exports (to-object.js?7b0b:5)
at hasOwn (has.js?5135:1)
at module.exports (well-known-symbol.js?b622:1)
at eval (set-to-string-tag.js?d44e:1)
at Object../node_modules/core-js/internals/set-to-string-tag.js (chunk-vendors.js:14713)
at **webpack_require** (main.js:854)
at fn (main.js:151)
at eval (es.symbol.js?a4d3:1)
at Object../node_modules/core-js/modules/es.symbol.js (chunk-vendors.js:16207)
```

3、如何集成

1.  将代码集合起来再打包，运行
2.  代码单独打包，导出对象，再引入运行
