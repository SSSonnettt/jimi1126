---
title: '如何获取免费的SSL证书？'
description: '最近在自建网站，在申请下来域名后，想要支持https，所以需要在服务器部署证书。刚好之前阮一峰的周刊有看到免费SSL证书获取，这不是有思路了？不是买不起，而且免费更有性价比！'
published: 2024/03/05
head:
  meta:
    - name: 'keywords'
      content: '自建网站,SSL证书, https, acme.sh, Buypass,ZeroSSL,SSL.com,Google Public CA'
---

## 前言

最近在自建网站，在申请下来域名后，想要支持 https，所以需要在服务器部署证书。刚好之前阮一峰的周刊有看到免费 SSL 证书获取，这不是有思路了？不是买不起，而且免费更有性价比！

## acme.sh

首先，我们的主角就是[acme.sh](https://github.com/acmesh-official/acme.sh/wiki#1-how-to-install)，这是一个集成了 ACME 客户端协议的 Bash 脚本，按照官方文档说明，我们直接在 Linux 下安装。

### 安装

```shell
# 直接下载
curl https://get.acme.sh | sh -s email=my@example.com
# 如果下载不下来，可以通过源码安装，服务器没有装git的话，先下到本地再上传服务器
git clone https://github.com/acmesh-official/acme.sh.git
cd acme.sh
./acme.sh --install -m email=my@example.com
```

::: warning
将 email=my@example.com换成我们自己的邮箱，避免无法收到上游证书的邮件通知，比如 Let's Encrypt 偶尔会错发证书，然后就会邮件通知你，这时候就需要重新签发一次证书了。
:::

### 初始化

把 acme.sh 安装到你的 home 目录下:

```shell
~/.acme.sh/
```

重新 Bash

```shell
source ~/.bashrc
```

最新版本 acme.sh 会默认开启自动更新，自动为我们创建 cronjob, 每天 0:00 点自动检测所有的证书, 如果快过期了, 需要更新, 则会自动更新证书。如果没有开启，我们可以手动开启与关闭：

```shell
# 开启
acme.sh --upgrade --auto-upgrade
# 关闭
acme.sh --upgrade --auto-upgrade  0
```

### 选择默认 CA

目前 acme.sh 支持 5 个正式环境 CA，分别是 Let's Encrypt、Buypass、ZeroSSL、SSL.com 和 Google Public CA，几个 CA 的简单对比：

| 功能     | LE     | Buypass         | ZeroSSL | SSL.com  | Google Public CA |
| -------- | ------ | --------------- | ------- | -------- | ---------------- |
| 有效期   | 90 天  | 180 天          | 90 天   | 90 天    | 90 天            |
| 多域名   | 支持   | 支持，最多 5 个 | 支持    | 收费支持 | 支持             |
| 泛域名   | 支持   | 不支持          | 支持    | 收费支持 | 支持             |
| Rate     | Limit  | 有              | 有      | 收费无   | 未知             |
| GUI      | 管理   | 否              | 否      | 有       | 有               |
| ECC      | 证书链 | 否              | 否      | 有       | 未知             |
| 客户支持 | 社区   | 收费            | 收费    | 收费     | 收费             |

默认使用 ZeroSSL，我们可以使用下面命令进行更改：

```shell
acme.sh --set-default-ca --server letsencrypt|buypass|zerossl|ssl.com|google
```

这里我选用 Let's Encrypt，切换 CA：

```shell
acme.sh --set-default-ca --server letsencrypt
```

### 生成证书

acme.sh 实现了 acme 协议支持的所有验证协议. 一般有两种方式验证: http 和 dns 验证.
我们这里使用 http 认证方式：

```shell
acme.sh --issue -d mydomain.com --nginx
```

::: tip
将 mydomain.com 换成我们的服务器的域名，服务器如果是 nginx 服务器与 apache 服务器，acme.sh 都可以智能的从配置中自动完成验证, 不需要指定网站根目录。无论是 apache 还是 nginx 模式, acme.sh 在完成验证之后, 会恢复到之前的状态, 都不会私自更改你本身的配置. 好处是你不用担心配置被搞坏, 也有一个缺点, 你需要自己配置 ssl 的配置, 否则只能成功生成证书, 你的网站还是无法访问 https. 但是为了安全, 你还是自己手动改配置吧.
:::
但出现控制台出现下图文件，证书就生成了。
![0ff5732d5cdb375c92f8472e614e88e.png](/file/img/ut-XB--2Jt2Y9fZrAN52e.png)

### copy/安装 证书

前面证书生成以后, 接下来需要把证书 copy 到真正需要用它的地方.
::: warning
注意, 默认生成的证书都放在安装目录下: ~/.acme.sh/, 请不要直接使用此目录下的文件, 例如: 不要直接让 nginx/apache 的配置文件使用这下面的文件. 这里面的文件都是内部使用, 而且目录结构可能会变化.
:::
正确的使用方法是使用 --install-cert 命令,并指定目标位置, 然后证书文件会被 copy 到相应的位置, 例如:
Apache example:

```shell
acme.sh --install-cert -d example.com \
--key-file       /path/to/keyfile/in/nginx/key.pem  \
--fullchain-file /path/to/fullchain/nginx/cert.pem \
--reloadcmd     "service nginx force-reload"
```

Nginx example:

```shell
acme.sh --install-cert -d example.com \
--key-file       /path/to/keyfile/in/nginx/key.pem  \
--fullchain-file /path/to/fullchain/nginx/cert.pem \
--reloadcmd     "service nginx force-reload"
```

我服务器用的是 nginx，所以执行下面指令：

```shell
acme.sh --install-cert -d example.com \
--key-file       /www/server/nginx/ssl/example.com.key  \
--fullchain-file /www/server/nginx/ssl/example.com.crt \
--ca-file        /www/server/nginx/ssl/example.com.ca.crt \
--reloadcmd     "systemctl restart nginx"
```

对应的 SSL 证书文件

```shell
ssl_certificate /www/server/nginx/ssl/example.com.crt;
ssl_certificate_key /www/server/nginx/ssl/example.com.key;
ssl_trusted_certificate /www/server/nginx/ssl/example.com.ca.crt;
```

然后，更新 nginx 的配置，开启 443 端口，可以参考下面配置：

```conf
  ## START: SSL/HTTPS example.com ###
  server {
    #------- Start SSL config with http2 support ----#    #------- Start SSL config with http2 support ----#
    listen 443 http2 ssl;
    server_name example.com;
    root /www/wwwroot/com/example;
    index index.html index.htm index.php;
    ## ssl on;
    ssl_certificate /www/server/nginx/ssl/example.com.crt;
    ssl_certificate_key /www/server/nginx/ssl/example.com.key;
    ssl_trusted_certificate /www/server/nginx/ssl/example.com.ca.crt;
    ssl_session_timeout 30m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDH+AESGCM:DH+AESGCM:ECDH+AES256:DH+AES256:ECDH+AES128:DH+AES:ECDH+3DES:DH+3DES:RSA+AESGCM:RSA+AES:RSA+3DES:!aNULL:!MD5:!DSS;
    ssl_session_cache shared:SSL:10m;
    ## ssl_dhparam /www/server/nginx/ssl/example.com/dhparams.pem;
    ssl_prefer_server_ciphers on;

    ## Improves TTFB by using a smaller SSL buffer than the nginx default
    ssl_buffer_size 8k;

    ## Enables OCSP stapling
    ssl_stapling on;
    resolver 8.8.8.8;
    ssl_stapling_verify on;

    ## Send header to tell the browser to prefer https to http traffic
    add_header Strict-Transport-Security max-age=31536000;

    ## SSL logs ##
    access_log /var/log/nginx/example.com/ssl_access.log;
    error_log /var/log/nginx/example.com/ssl_error.log;
    #-------- END SSL config -------##

    # Add rest of your config below like document path and more ##

    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$ {
      expires 30d;
    }

    location ~ .*\.(js|css)?$ {
      expires 7d;
    }

    location ~ /\. {
      deny all;
    }

  }
```

::: warning
第 9 到 11 行是证书路径配置
我们需要检查一下 443 端口是否放行，如果是 ECS 服务器需要配置安全组
:::

## 验证

最后，我们可以通过在线的 SSL 验证工具[ssllabs.com](https://www.ssllabs.com/ssltest/index.html)验证我们配置是否正常。如果显示是绿色，那么表明我们拥有了一台支持 https 协议的服务器了。
