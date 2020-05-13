const { Friendship } = require("wechaty")

// 发送，接受好友请求的Class
// 好友添加监听回调
module.exports = async function onFriendShip(friendship) {
    try {
        console.log("添加好友" + friendship.contact().name())
        if (friendship.type() === Friendship.Type.Receive) {
            await friendship.accept()
        }
    } catch (e) {
        console.error(e)
    }
}