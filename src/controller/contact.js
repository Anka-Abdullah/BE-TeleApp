const { response } = require('../helper/response')
const { get, getFriend, post } = require('../model/contact')
module.exports = {
  get: async (req, res) => {
    try {
      const { search, id } = req.query
      const result = await get(id, search)
      console.log(result)
      return response(res, 200, 'success get contact', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  getFriend: async (req, res) => {
    try {
      const { friendId } = req.query
      const { id } = req.params
      const result = await getFriend(id, friendId)
      return response(res, 200, 'success get friend', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  post: async (req, res) => {
    try {
      const { userId, friendId } = req.body
      const data = {
        userId,
        friendId
      }
      const result = await post(data)
      return response(res, 200, 'success add friend', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  }
}
