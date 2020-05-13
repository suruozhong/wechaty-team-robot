//入群邀请确认
module.exports = async function onRoomInvitation(roomInvitation) {
    try {
        const topic = await roomInvitation.topic()
        console.log(`自动通过入群邀请:`+topic)
        await roomInvitation.accept()
    } catch (e) {
        console.error(e)
    }
}