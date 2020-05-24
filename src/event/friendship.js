const { Friendship } = require("wechaty")

// 发送，接受好友请求的Class
// 好友添加监听回调
exports.onFriendShip = bot =>{
    return async function onFriendShip(friendship) {
        try {
            console.log("添加好友" + friendship.contact().name())
            if (friendship.type() === Friendship.Type.Receive) {
                await friendship.accept()
                console.log(friendship.contact())
                setTimeout(function() {
                    say(bot,friendship.contact().id)
                }, 5000)
            }
        } catch (e) {
            console.error(e)
        }
    }
}

async function say(bot, id){
    const contact = await bot.Contact.find({id: id})
    await contact.say("同学你好，我是机器人，你的小助手，开启自动回复，请回复：小助手");
}