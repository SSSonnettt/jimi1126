---
title: 'R2 搭配 PicGo + tinypng 快速搭建免费的图床'
description: '我常常为没有一套自己的 CMS 系统而烦恼，为频繁做数据迁移而心累。自己写了一套却越做越大，想想算了，为何不白嫖呢？为何为难自己呢？'
published: 2024/09/09
head:
  meta:
    - name: 'keywords'
      content: 'R2, PicGo, tinypng, CMS'
---

## 前言

我常常为没有一套自己的 CMS 系统而烦恼，为频繁做数据迁移而心累。自己写了一套却越做越大，想想算了，为何不白嫖呢？为何为难自己呢？

目前网上有很多云，又稳又快，可惜不给白嫖...

不过网上也有一些可以给我尝尝鲜的云，像[S3](https://aws.amazon.com/cn/s3/?nc2=h_ql_prod_st_s3)、[supabase](https://github.com/supabase/supabase)、[Firebase](https://firebase.google.cn/?hl=zh-cn)、[R2](https://www.cloudflare-cn.com/developer-platform/r2/)，如果是自己写 C 端推荐用 supabase，开源以及文档很全。我选择 R2，因为它真的大！真的快！

![](https://r2.jimi1126.cn/img/2024/09/766c16cc4efca802d4f5d3d7631cf816.png)

现在就来搭建一套属于自己的图床吧，免费的。

## R2

### 说明

cloudflare 的 R2 是一种云端的存储服务，可以让您把图片、视频、文档等任何类型的数据保存在互联网上，然后通过网址来访问它们。R2 的特点是不管您从哪里访问数据，都不需要额外付费，而且速度很快，因为它有全球的网络加速。

S3 是 Amazon 提供的一种类似的存储服务，也可以让您把数据保存在互联网上，然后通过网址来访问它们。S3 的特点是有不同的存储级别，可以根据您对数据的访问频率和重要性来选择合适的价格和性能。

R2 和 S3 都使用了一种叫做 S3 的协议，这是一种规定了如何存储和访问数据的标准。这意味着您可以用同样的工具、库和扩展来操作 R2 和 S3 中的数据，而不需要做太多的改动。

cloudflare 的 R2 不需要支付任何出口费用，即读取数据是不收取费用的，只需支付存储费用和对数据执行操作的费用，但是免费套餐每月 10GB 存储和 100 万次写操作对于我们个人用户来说是足够使用了，哪怕超过了免费用额，收费也是比 S3 便宜很多的。

### 创建

登录 cloudflare，选择左侧的“R2”选项，创建存储桶，然后根据自己情况选择对应参数。

创建完成后，可以看到一个 S3 Api 调用地址，这个后面会用。往下看是公开访问存储空间，默认情况下存储空间还是私有的，有两种方法设置存储空间的公开访问。

- 启用 r2.dev 子域，Internet 上的任何人都可以使用公共 r2.dev URL 查看此存储桶中的对象。但在使用时有速率限制，因此，不建议用于生产。此外，访问和缓存等 Cloudflare 功能无法再使用。
- 如果有自己的域名，可以在域名下添加一条 DNS 记录指向 r2.dev，从而实现存储空间的公开访问。这种方式可以使用 cloudflare 的功能，如缓存，防盗链等。

> 自定义域名配置时，如果域名 dns 服务商在 cloudflare 上，会自动添加一条 dns 记录，如果不在的话，那么需要手动去域名购买商提供的 dns 服务器配置，不过我没有试过其他 dns 服务商的，不行的话，可以考虑将 dns 服务商转到 cloudflare 下或换方案一。

再往下还可以设置 CORS 配置跨域策略。

### 配置

返回 R2 概述面板，点击右上角【管理 R2 API 令牌】超链接，然后点击创建 API 令牌：

![](https://r2.jimi1126.cn/img/2024/09/6691a6e59da05329efe62cd0ec2d944e.png)

令牌创建成功后请不要关闭页面，妥善保存页面上给到的令牌密钥信息，在后面的 picgo s3 插件配置中会用到。

![](https://r2.jimi1126.cn/img/2024/09/df097fc1d69a10cbdc6ccd590b2a2e9f.png)

## picgo

### 说明

Picgo  一个用于快速上传图片并获取图片 URL 链接的工具，它可以方便地将图片上传到各种图床服务。Picgo 支持 Windows、MacOS 和 Linux 系统，它有一个简洁的界面和丰富的插件。可以通过快捷键、拖拽、剪贴板等方式上传图片，也可以对图片进行压缩、裁剪、水印等处理。

### 安装

访问 [PicGo 官网](https://molunerfinn.com/PicGo/)，点击免费下载，跳转到 GitHub 网站下载适合你电脑操作系统的安装文件。mac 下载 .dmg 文件，Windows 下载 .exe 文件，下载完成后进行安装。可以顺便简单看看 picgo 如何使用。

### 安装插件

接着安装两个 picgo 的插件：s3（上传到 R2）、tinypng（图片压缩），在 picgo 主页面打开插件设置，搜索 s3 以及 tinypng 并安装。

![](https://r2.jimi1126.cn/img/2024/09/17048596533a43f1b054b3f489951c40.png)

### 配置插件

#### s3

可以先打开 PicGo 把不需要的图床关掉显示，然后从图床设置下，进入 Amazon S3 配置页面，选择配置子项进行配置修改。

![](https://r2.jimi1126.cn/img/2024/09/62680f93ca4c57cfadcbb025075a605c.png)
![](https://r2.jimi1126.cn/img/2024/09/dafca26531e7905d9a4d16af2b1d6126.png)

> 自定义节点中的 S3 API 地址不需要带上桶名，不然会桶内新建一个桶名的目录；
> 自定义域名是公开访问链接，应该可以配置桶设置里面的自定义域或者 r2.dev（需启用）

### tinypng

tinypng 的使用需要申请 API Token，每月有 500 免费额度，对于我来说够了。

打开[ tinypng 官网 ](https://tinify.cn/)，然后选择【开发者 API】标签，输入个人信息，完成注册。

![](https://r2.jimi1126.cn/img/2024/09/fe5b694bb6177c23bd6ab010a7661046.png)

收到邮件后打开 tinypng 的仪表板，找到申请下来的 API key 启用

![](https://r2.jimi1126.cn/img/2024/09/745250d792f263a40c04e8874f875b13.png)

![](https://r2.jimi1126.cn/img/2024/09/144bbac1e4fb66d3c4dccb8e76841ecd.png)

接下来回到 PicGo 在插件设置里面找到 tinypng 的小齿轮，点击进行配置 key，记得启用。

![](https://r2.jimi1126.cn/img/2024/09/f95e403f3a8e7dd1203b3f7a3fe6d6e1.png)

## 测试

最后测试一下是否能够成功上传图片，以及压缩和访问。

将这张图片进行上传，大小 125kb

![](https://r2.jimi1126.cn/img/2024/09/544c5707a80c86ed8154355bf03f6ffa.png)

然后上 R2 找到这张图片点开看里面信息，可以看到大小被压缩到 23.69kb 了，压缩比杠杆的，公共访问链接也可以在这里找到。

![](https://r2.jimi1126.cn/img/2024/09/fe2d0725749937efab8bfd7bc82cf9d8.png)

> 注意：cloudflare 有做防盗链，默认自定义域下才能访问，如果需要做多域访问可以查看[Hotlink 配置教程](https://developers.cloudflare.com/waf/tools/scrape-shield/hotlink-protection/)

至此，图床算是搭好了。
