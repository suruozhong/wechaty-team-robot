// 消息处理
module.exports = bot =>{
    return async function onMessage(msg) {
        const contact = msg.from() //发送消息的联系人
        const text = msg.text() //消息内容
        const room = msg.room()  //群消息，null则不是 
        // 判断消息来自自己，直接return
        if (msg.self()) return

        // 判断此消息类型是否为文本
        if (msg.type() == Message.Type.Text) {
            //回复消息
            await msg.say(res)
        }else{
            console.log("非文本消息不做处理")
        }
    }
}