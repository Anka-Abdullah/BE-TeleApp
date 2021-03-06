const jwt = require('jsonwebtoken')
const { response } = require('../helper/response')

module.exports = {
  authorization: (req, res, next) => {
    let token = req.headers.authorization
    if (!token) {
      return response(res, 403, 'please login first')
    } else {
      token = token.split(' ')[1]
      jwt.verify(token, 'sayang', (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          console.log(error)
          return response(res, 403, error.message)
        } else {
          req.token = result
          next()
        }
      })
    }
  },
  access: (req, res, next) => {
    if (req.token.roleId !== 1) {
      return response(res, 400, 'you cannot access this end point')
    } else {
      next()
    }
  }
}
