const { Message } = require("wechaty")
const api = require('../api/api')

// 消息处理 
exports.onMessage = bot => {
    return async function onMessage(msg) {
        console.log("收到消息",msg)
        const contact = msg.from() //发送消息的联系人
        console.log("联系人",contact)
        const text = msg.text() //消息内容
        const room = msg.room()  //群消息，null则不是 
        // 判断消息来自自己，直接return
        if (msg.self()) return

        // 判断此消息类型是否为文本
        if (msg.type() == Message.Type.Text) {
            if(room==null){
                //调用接口处理消息
                var ret = await api.handle({msg: text,wxId: contact.payload.id,wxName: contact.payload.name})
                //回复消息
                await msg.say(ret.data)
            }else{
                console.log("群消息暂不做处理")
            }
        }else{
            console.log("非文本消息不做处理")
        }
    }
}

//查询待发送的任务消息
exports.taskSendMessage = async function(bot){
    var ret = await api.list()
    var list = ret.data
    console.log("消息列表",list)
    if(list.length>0){
        for (let i = 0; i < list.length; i++) {
            const vo = list[i];
            const contact = await bot.Contact.find({name: vo,wxName})
            console.log("查询结果",contact)
            if(contact!=null){
              await contact.say(vo.msg)
            }
        }

    }

}