const { Message } = require("wechaty")
const api = require('../api/api')

// 消息处理 
exports.onMessage = bot => {
    return async function onMessage(msg) {
        console.log("收到消息",msg)
        const contact = msg.from() //发送消息的联系人
        const text = msg.text() //消息内容
        const room = msg.room()  //群消息，null则不是 
        // 判断消息来自自己，直接return
        if (msg.self()) return

        // 判断此消息类型是否为文本
        if (msg.type() == Message.Type.Text) {
            if(room==null){
                //调用接口处理消息
                var ret = await api.handle({msg: text,wxId: contact.payload.id,wxName: contact.payload.name,type: 1})//type=1私聊，2群聊
                //回复消息
                await msg.say(ret.data)
            }else{
                //群消息
                //调用接口处理消息
                var ret = await api.handle({msg: text,wxId: room.id,wxName: contact.payload.name,type: 2})
                if(ret.data){
                    //回复消息
                    await room.say(ret.data)
                }
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
    if(list && list.length>0){
        for (let i = 0; i < list.length; i++) {
            const vo = list[i];
            if(vo.type === 1){  //type=1私聊，2群聊
                const contact = await bot.Contact.find({id: vo.wxId})
                if(contact!=null){
                    await contact.say(vo.msg)
                    await api.setSend({id: vo.id,status: 1})  //设置该任务已发送,status=1为已执行
                }else{
                    api.setSend({id: vo.id,status: 3})  
                }
            }else if(vo.type === 2){
                const room = await bot.Room.find({id: vo.wxId})
                if(room!=null){
                    //获取@的成员
                    var names = vo.wxName.split(",")
                    
                    var atList = []
                    for(var y=0; y<names.length; y++){
                        let roomContact = await room.member({name: names[y]})
                        if(roomContact!=null){
                            atList.push(roomContact)
                        }else{
                            //群内昵称查询
                            roomContact = await room.member({roomAlias: names[y]})
                            if(roomContact!=null){
                                atList.push(roomContact)
                            }
                        }
                    }
                    await room.say(vo.msg, ...atList)
                    await api.setSend({id: vo.id,status: 1})  //设置该任务已发送
                }else{
                    api.setSend({id: vo.id,status: 3})  
                }
            }
            
        }

    }

}