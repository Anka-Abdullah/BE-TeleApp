const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { response } = require('../helper/response')
const {
  register,
  cekEmail,
  patchUser,
  getUserById,
  deleteUser
} = require('../model/user')
const fs = require('fs')

module.exports = {
  login: async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body
      const email = await cekEmail(userEmail)
      if (email.length < 1) {
        return response(res, 200, 'Email Not Found')
      } else {
        const checkPassword = bcrypt.compareSync(
          userPassword,
          email[0].userPassword
        )
        if (!checkPassword) {
          return response(res, 400, 'Wrong Password')
        } else {
          const { userId, userName, userEmail, userStatus, roleId } = email[0]
          const payload = {
            userId,
            userName,
            userEmail,
            userStatus,
            roleId
          }
          const token = jwt.sign(payload, 'sayang', {
            expiresIn: 7 * 24 * 60 * 60
          })
          const result = { ...payload, token }
          return response(res, 200, 'Login success', result)
        }
      }
    } catch (error) {
      return response(res, 400, 'bad request', error)
    }
  },
  register: async (req, res) => {
    try {
      const {
        userName,
        userEmail,
        userPassword,
        userAddress,
        userStatus,
        userPhone
      } = req.body

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)

      const data = {
        userName,
        userEmail,
        userPassword: encryptPassword,
        userAddress,
        userStatus,
        userPhone
      }
      const email = await cekEmail(userEmail)
      if (email.length > 0) {
        return response(res, 400, 'Email has been existed')
      }
      const result = await register(data)
      return response(res, 200, 'success post data', result)
    } catch (error) {
      return response(res, 400, 'Register Failed', error)
    }
  },
  patchUser: async (req, res) => {
    try {
      const { id } = req.params
      const {
        userName,
        userEmail,
        userAddress,
        userStatus,
        userPhone
      } = req.body
      const data = {
        userName,
        userEmail,
        userAddress,
        userStatus,
        userPhone,
        image: req.file === undefined ? '' : req.file.filename
      }
      const unimage = await getUserById(id)
      const photo = unimage[0].image
      if (photo !== '' && req.file !== undefined) {
        fs.unlink(`./uploads/${photo}`, function (err) {
          if (err) throw err
        })
      }
      const result = await patchUser(id, data)
      return response(res, 200, 'success patch data', result)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params
      const unimage = await getUserById(id)
      const photo = unimage[0].image
      if (photo !== '') {
        fs.unlink(`./uploads/${photo}`, function (err) {
          if (err) throw err
        })
      }
      const result = await deleteUser(id)
      return response(res, 200, `data id : ${id} deleted`, result)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  }
}
