---
title: 'nginx的location配置规则'
description: 'nginx的location有哪些规则？'
published: 2023/11/05
head:
  meta:
    - name: 'keywords'
      content: 'Nginx, Nginx HTTP, Nginx location'
---

## 说明

location 的 location 有哪些规则？

1. location = /uri，=开头表示精确匹配，只有完全匹配上才能生效；
2. location ^~ /uri，^~ 开头对 URL 路径进行前缀匹配，并且在正则之前；
3. location ~ pattern，~开头表示区分大小写的正则匹配；
4. location ~* pattern，~*开头表示不区分大小写的正则匹配；
5. location /uri，不带任何修饰符，也表示前缀匹配，但是在正则匹配之后；
6. location /，通用匹配，任何未匹配到其它 location 的请求都会匹配到，相当于 switch 中的 default。

::: warning

- 匹配的顺序是先匹配普通字符串，然后再匹配正则表达式；
- 一般情况下，匹配成功了普通字符串 location 后还会进行正则表达式 location 匹配；
- 优先级：(location =) > (location 完整路径) > (location ^~ 路径) > (location ~,~\* 正则顺序) > (location /uri 部分起始路径) > (/)
  :::

## 示例

1. **=：精确匹配**

```shell
server {
    server_name baidu.com
　　location = /abc {
　　　　……
　　}
}
```

```js
// match
http://baidu.com/abc
http://baidu.com/abc?p1

// mismatch
http://baidu.com/abc/de
http://baidu.com/abcde
```

2. **^~：最佳匹配**

```shell
server {
　　server_name baidu.com;
　　location ^~ /abc/ {
　　　　……
　　}
}
```

```js
// match
http://baidu.com/abc/de
// mismatch
http://baidu.com/abcde
```

3. **~ ：区分大小写**

```shell
server {
    server_name baidu.com;
　　location ~ ^/abc$ {
　　　　……
　　}
}
```

```js
// match
http://baidu.com/abc
http://baidu.com/abc?p1=11&p2=22

// mismatcn
http://baidu.com/ABC
http://baidu.com/abc/
http://baidu.com/abcde
```

4. **~\* ：不区分大小写**

```shell
server {
  server_name baidu.com;
  location ~* ^/abc$ {
    ……
  }
}
```

```js
// match
http://baidu.com/abc
http://baidu..com/ABC
http://baidu..com/abc?p1=11&p2=22

// mismatcn
http://baidu..com/abc/
http://baidu..com/abcde
```

5. **/uri 前缀匹配**

```shell
server {
　　server_name baidu.com;
　　location /abc {
　　　　……
　　}
}
```

```js
// match
http://baidu.com/abc
http://baidu.com/abc?p1
http://baidu.com/abc/

// mismatch
http://baidu.com/bcde
```

6. **/ 通用匹配**

```shell
server {
　　server_name baidu.com;
　　location / {
　　　　……
　　}
}
```

```js
// 任何未匹配到其它location的请求都会匹配
http://baidu.com/abc
http://baidu.com/abc?p1
http://baidu.com/abc/
http://baidu.com/bcde
```
