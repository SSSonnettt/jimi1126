---
title: 'git使用遇到的问题'
description: '本地多账号（配置了global.user.name），代码无法正确拉取远程代码问题'
published: 2020/5/19
head:
  meta:
    - name: 'keywords'
      content: 'git, git config --local, git host, git cherry-pick, git diff'
---

## git 使用遇到的问题

### 本地多账号（配置了 global.user.name），代码无法正确拉取远程代码问题

解决：设置 local 配置

原理：git 配置的优先级（作用域）：system < global < local

步骤：

1. 运行 git bash here，cd 到工作目录;

2. 初始化仓库，git init &#60;name&#62; && cd &#60;name&#62;;

3. 设置用户信息，git config --local user.name &#60;username&#62; && git config --local user.email &#60;email&#62;

4. 设置仓库地址，git remote add &#60;name&#62; &#60;url&#62;

5. 从远程仓库获取代码到本地，git fetch &#60;name&#62; &#60;branch&#62;

6. 检出代码，git checkout &#60;name&#62;/&#60;branch&#62;

> 注意：如果是不同平台，ssh 密钥不同需在.ssh 文件夹下配置 config 文件，格式如下：

```shell
  \#github
  Host github.com
  HostName github.com
  IdentityFile ~/.ssh/id_rsa_github
  User pinnuli

  \#osc
  Host gitee.com
  HostName gitee.com
  IdentityFile ~/.ssh/id_rsa_osc
  User pinnuli
```

## 几个知道的 git 命令

### git cherry-pick 部分合并分支提交

当我们需要另一个分支的部分代码变动时，可以通过 Cherry pick 操作，如现仓库有两个分支：

```shell
      master a-b-c-d
    		  \
    test       e-f-g
```

现在将提交 f 应用到 master 分支：

```shell
      #切换到master分支
    git checkout master
    #cherry pick操作
    #参数可以时分支名称，此时为该分支的最新提交
    git cherry-pick <Hash>
```

操作完成后，代码库变成下面样子：

```shell
      master a-b-c-d-f
    		  \
    test       e-f-g
```

支持合并多个提交

```shell
      #将 A 和 B 两个提交应用到当前分支
    git cherry-pick <HashA> <HashB>
    #将 A 到 B 之间的提交应用到当前分支（不包括A）
    git cherry-pick <HashA>..<HashB>
    #将 A 到 B 之间的提交应用到当前分支（包括A）
    git cherry-pick <HashA>^..<HashB>
```

从一个仓库的分支合并提交到当前分支:

```shell
      #将该库加为远程仓库
    git remote add target git://gitUrl
    #将远程代码抓取到本地
    git fetch target
    #查看需要合并的远程仓库提交的哈希值
    git log target/master
    #cherry pick操作
    git cherry-pick <Hash>
```

### git diff 比较文件差异

现在仓库里有 a.txt 文件

**a.txt**

```shell
    a
    a
    a
    a
    a
    a
    a
    a
```

进行本地的更改

**a.txt**

```shell
    a
    a
    a
    a
    b
    a
    a
    a
```

进行比较

**git diff**

```shell
    $ git diff
    diff --git a/a.txt b/a.txt
    index 2bb6d58..a33d8ee 100644
    --- a/a.txt
    +++ b/a.txt
    @@ -2,7 +2,7 @@ a
     a
     a
     a
    -a
    +b
     a
     a
     a
    \ No newline at end of file
```

第一行表示结果为 git 格式的 diff。

```shell
    diff --git a/a b/a
```

进行比较的是，a 版本的 a（即变动前）和 b 版本的 a（即变动后）。

第二行表示两个版本的 git 哈希值（index 区域的 2bb6d58 对象，与工作目录区域的 a33d8ee 对象进行比较），最后的六位数字是对象的模式（普通文件，644 权限）。

```shell
  index 2bb6d58..a33d8ee 100644
```

第三行表示进行比较的两个文件。

```shell
    --- a/a.txt
    +++ b/a.txt
```

"---"表示变动前的版本，"+++"表示变动后的版本

后面的行是合并格式的 diff 表示

```shell
     @@ -2,7 +2,7 @@
     a
     a
     a
     a
    -a
    +b
     a
     a
     a
```

“-2,7 +2,7”表示变动范围，用两个@符号代表起始与结束。其中"-2,7"的减表示变动前的文件，2 表示第二行，7 表示连续 7 行，也就是变动前的文件的第 2 行起的连续 7 行，“+2,7”的加表示变动后，2，7 与前面一样。
所以，“-2,7 +2,7”表示：**变动前的文件的第 2 行开始的连续 7 行改为变动后的文件的第 2 行开始的连续 7 行**
