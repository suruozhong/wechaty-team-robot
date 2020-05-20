[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-green.svg)](https://github.com/chatie/wechaty)
[![Wechaty开源激励计划](https://img.shields.io/badge/Wechaty-开源激励计划-green.svg)](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty)



# wechaty-team-robot
团队小助手

#因为某些原因,一些依赖包无法直接从官方源下载，故此需要使用淘宝镜像源
npm install -g cnpm --registry=https://registry.npm.taobao.org

#安装
cnpm install

#运行
npm run dev

#### 目前实现功能

- 自动通过好友验证
- 私聊群聊自动回复
  - 回复 `帮助` 查看功能介绍
  - 回复 `小助手` 开启自动回复
  - 回复 `安静点` 关闭自动回复
- 自动聊天
  - 群聊私聊中开启自动回复后，可以和机器人聊天
- 定时获取并发送的待办提醒（私聊或者群聊@多人）
- 中英文互译

#### 结构

```js
|-- src/
|---- api/
|------ api.js  #请求的接口
|------ request.js #request请求
|---- constant/
|------ config.js #参数配置文件
|---- event/
|------ friendship.js	# 好友添加监听回调
|------ message.js 	# 消息监听回调
|------ room.js		# 进入房间监听回调
|------ roomInvitation.js		# 群邀请监听回调
|-- index.js	# 入口文件
|- package.json
```

