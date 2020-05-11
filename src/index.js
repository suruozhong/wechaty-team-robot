// bot.js
const { Wechaty } = require('wechaty')
const { ScanStatus } = require('wechaty-puppet')
const { PuppetPadplus } = require('wechaty-puppet-padplus')
const QrcodeTerminal = require('qrcode-terminal')

const config = require('./constant/config')
const message = require('./event/message')
const friendship = require('./event/friendship')
const room = require('./event/room')

const bot = new Wechaty({
  puppet: new PuppetPadplus({
    token: config.token,
  }),
  name: config.name, // generate xxxx.memory-card.json and save login data for the next login
})

bot
  .on('scan', (qrcode, status) => { //扫码登录
    if (status === ScanStatus.Waiting) {
      QrcodeTerminal.generate(qrcode, {
        small: true
      })
    }
  })
  .on('login', (user) =>{
    console.log("机器人登录成功",user)
  })
  .on('logout', (user) =>{
    console.log("机器人退出登录",user)
  })
  .on('message', message(bot)) //消息处理
  .on("friendship", friendship) // 好友添加
  .on("room-join", room) // 加入群聊
  .start()