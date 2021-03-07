const { response } = require('../helper/response')
const {
  getRoom,
  getMsg,
  createMsg,
  deleteMsg,
  createRoom
} = require('../model/message')
module.exports = {
  getMsg: async (req, res) => {
    try {
      const { roomId } = req.query
      const room = parseInt(roomId)
      const result = await getMsg(room)
      return response(res, 200, 'chat', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  getRoom: async (req, res) => {
    try {
      const { userA, userB } = req.query
      const result = await getRoom(userA, userB)
      return res.send(result[0])
    } catch (error) {}
  },
  createRoom: async (req, res) => {
    try {
      const { userA, userB } = req.body
      const data = {
        uniq: new Date().getTime().toString().slice(5) * 76543,
        userA,
        userB
      }
      const check = await getRoom(userA, userB)
      if (!check) {
        const result = await createRoom(data)
        return response(res, 200, 'create room', result)
      }
      return response(res, 226, 'room has been existed')
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  createMsg: async (req, res) => {
    try {
      const { userId, friendId, room, message } = req.body

      const data = {
        userId,
        friendId,
        room,
        message,
        status: 1
      }
      const result = await createMsg(data)
      return response(res, 200, 'send messages', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  deleteMsg: async (req, res) => {
    try {
      const msgId = req.params.id
      const result = await deleteMsg(msgId)
      return response(res, 200, 'deleted messages', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  }
}
