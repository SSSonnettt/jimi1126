---
title: 'win10 下 docker 的安装'
description: '最近，因为一些事情，需要用到 docker。但是我的电脑是 win10 家庭版，没有安装 docker 的选项。所以得想办法了。'
published: 2024/05/05
head:
  meta:
    - name: 'keywords'
      content: 'docker, hyper-v, wsl'
---

## 前言

最近，因为一些事情，需要用到 docker。但是我的电脑是 win10 家庭版，没有安装 docker 的选项。所以得想办法了。

## hyper-V

hpyper-V 是 windows10 的虚拟机，可以安装 linux 系统。而 hyper-v 需要 windows10 的版本是 2004 及更高。

### 安装 Hyper-V

一般地家庭版不会装 hyper-V，复制下面代码，建一个 bat 文件，然后双击运行，最后重启就可以了。

```shell
pushd "%~dp0"
dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt
for /f %%i in ('findstr /i . hyper-v.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"
del hyper-v.txt
Dism /online /enable-feature /featurename:Microsoft-Hyper-V-All /LimitAccess /ALL
```

设置自动启动

```
bcdedit /set hypervisorlaunchtype auto
```

在 windows 功能里面可以检查有没有启动

控制面板-->程序-->程序和功能-->启用或关闭 Windows 功能

勾选一下几个选项

1. Hyper-V,

2. Windows 虚拟机监控程序平台

3. 适用于 Linux 的 Windows 子系统，

4. 虚拟机平台。

## wsl

wsl 是 windows 下的 linux 子系统，可以安装 linux 系统。

### 安装

```
wsl --install
```

查看可以安装虚拟机的版本，并选择要安装的版本

```
wsl --list --online # 查看可以安装版本
wsl --install -d Ubuntu-22.04 # 以Ubuntu为例
```

安装完成后，设置用户名、密码

### 设置 wsl 安装位置

因为 wsl 的虚拟机默认安装在 c 盘，这是很难受的，所以得挪个位置。

- 第一步，停掉 wsl

```
wsl --shutdown
```

然后，挪动 Ubuntu，按 win+i 进入应用列表，找到 Ubuntu-22.04 点三个点选择移动。

- 第二步，迁移 wsl 安装位置

```
wsl --export Ubuntu-22.04 D:\Ubuntu-22.04.tar
```

> 注：wsl --export <Distribution Name> <FileName>

- 第三步，取消 Ubuntu 的注册

```
wsl --unregister Ubuntu-22.04
```

- 第四步，将 Ubuntu-22.04 导入到新位置

```
wsl --import Ubuntu-22.04 D:\Ubuntu-wsl D:\Ubuntu-22.04.tar
```

> 注意：wsl --import <Distribution Name> <InstallLocation> <FileName> <Distribution Name>，<InstallLocation>不能是 Program Files 文件夹，不然会报错

- 第五步，修改默认用户

```
Ubuntu2204 config --default-user xxx
```

> <DistributionName> config --default-user <Username>

- 第六步，启动 wsl

```
wsl
```

- 第七步，配置国内源（阿里源）

备份 sources.list 文件：cp /etc/apt/sources.list /etc/apt/sources.list.bak

然后把 sources.list 里面的内容全删除，替换为以下内容

```
deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
```

然后执行下面命令更新源

```
sudo apt-get update
```

## Docker Desktop

docker desktop 是 docker 的桌面版，可以安装 linux 系统。

- 第一步，下载安装包
- 第二步，通过命令行安装

```
start /w "" "Docker Desktop Installer.exe" install --installation-dir=D:\Docker
```

- 第三步，启动 Docker Desktop Service 服务。

- 第四步，启动桌面程序，登录与配置

```
"registry-mirrors":[
		"https://docker.mirrors.ustc.edu.cn",
		"https://registry.docker-cn.com",
		"http://hub-mirror.c.163.com",
		"https://mirror.ccs.tencentyun.com"
]
```

最后，测试一下

```
docker run hello-world
```

能 download 下来就说明成功了。
