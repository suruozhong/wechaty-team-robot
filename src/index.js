// bot.js
const { Wechaty } = require('wechaty')
const { ScanStatus } = require('wechaty-puppet')
const { PuppetPadplus } = require('wechaty-puppet-padplus')
const QrcodeTerminal = require('qrcode-terminal')
const config = require('./constant/config')
const {onMessage,taskSendMessage} = require('./event/message')
const friendship = require('./event/friendship')
const room = require('./event/room')

var isLogin = false;  //是否登录标记

const bot = new Wechaty({
  puppet: new PuppetPadplus({
    token: config.token,
  }),
  name: config.name, // generate xxxx.memory-card.json and save login data for the next login
})

//目前先用轮询，查询是否有要发的消息
const sendTimeMsg = setInterval(() => {
  if(isLogin){
    taskSendMessage(bot)
  }
}, 5000);  

bot
  .on('scan', (qrcode, status) => { //扫码登录
    if (status === ScanStatus.Waiting) {
      QrcodeTerminal.generate(qrcode, {
        small: true
      })
    }
  })
  .on('login', (user) =>{
    isLogin = true
    console.log("机器人登录成功",user)
  })
  .on('logout', (user) =>{
    isLogin = false
    clearInterval(sendTimeMsg)
    console.log("机器人退出登录",user)
  })
  .on('message', onMessage(bot)) //消息处理
  .on("friendship", friendship) // 好友添加
  .on("room-join", room) // 加入群聊
  .start()
