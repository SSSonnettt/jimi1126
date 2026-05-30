---
title: 'Vue3的definedAsyncComponent注意事项'
description: '最近使用 Vue3 的 definedAsyncComponent 宏出现错误：TypeError: Failed to fetch dynamically imported module: http://localhost:4173/pages/drop-components/resume/Blank.vue'
published: 2024/05/05
head:
  meta:
    - name: 'keywords'
      content: 'definedAsyncComponent, 加载异步组件, dynamic-import-vars, import.meta.glob'
---

## 问题

最近使用 Vue3 的 definedAsyncComponent 宏出现错误：

```shell
报错：index-BjNzREC-.js:14 TypeError: Failed to fetch dynamically imported module: http://localhost:4173/pages/drop-components/resume/Blank.vue
```

原因是我的动态组件想通过变量引入的

```js
    ...
    function loadAsyncDropComponent(path: string, cb: Function = () => {}) {
      const AsyncComp = defineAsyncComponent({
        // 加载函数
        loader: () => {
          const asyncComp = import(path);
          asyncComp.finally(() => {
            nextTick(() => {
              cb && cb();
            });
          });
          return asyncComp as any;
        },

        // 加载异步组件时使用的组件
        loadingComponent: LoadingComponent,
    	...
```

这导致 rollup 无法静态分析这段异步加载。

> https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations

## 解决

方案一：
按照 dynamic-import-vars 的格式约束编写路径：

```js
import(`../components/${dir}/${name}.vue`);
```

方案二：
通过 import.meta.glob 函数动态导入，再拿路径去匹配：

```js
  const modules = import.meta.glob(`../components/**/*.vue`)
  const AsyncComp = modules[`../components/${dir}/${name}.vue`]()
  ...
```
