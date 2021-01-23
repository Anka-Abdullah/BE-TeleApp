const { response } = require('../helper/response')
const { get } = require('../model/contact')
module.exports = {
  get: async (req, res) => {
    try {
      const { id } = req.params
      const result = await get(id)
      return response(res, 200, 'success get contact', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  }
}
