const { response } = require('../helper/response')
const { getMsg } = require('../model/message')
module.exports = {
  getMsg: async (req, res) => {
    try {
      const { userId, friendId } = req.query
      const result = await getMsg(userId, friendId)
      return response(res, 200, `chat with ${friendId}`, result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  }
}
