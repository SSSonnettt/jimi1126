---
title: '实现一个自动生成单元测试的cli'
description: '最近在写一个通过函数注解生成对应单元测试的工具 Unitest，为了便利性写一个 cli 来支持，这里做出记录。'
published: 2022/11/2
head:
  meta:
    - name: 'keywords'
      content: 'cli, Unitest, commander, npm link'
---

## 前言

最近在写一个通过函数注解生成对应单元测试的工具 Unitest，为了便利性写一个 cli 来支持，这里做出记录。

## 步骤

1. 创建项目，init
2. 安装 commander
3. 定义指令

```shell
#!/usr/bin/env node
const { program } = require('commander');
const pkg = require('../package.json');
program.version(pkg.version, '-v, --version', '当前版本');
program
.option('-f, --from <dir>', '指定目标目录', 'src')
.option('-t, --to <dir>', '指定生成目录', 'test')
.option('-e, --ext <suffix>', '指定目标文件后缀', '.js')
.option('-c, --config <file>', '指定配置文件');
program.parse(process.argv);
```

(F:\学习笔记\img\定义指令.jpg)

指令处理，编辑脚本，并测试

在 package.json 添加 bin

本地全局安装，npm link （要取消 npm unlink 就行）

现在就可以跑了。

感觉不对劲？debug 一下。

到这里，自测通过后，我们 cli 的核心就完成了。

添加点交互
