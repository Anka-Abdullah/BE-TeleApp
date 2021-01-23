const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { response } = require('../helper/response')
const { register, cekEmail, patchUser, getUserById } = require('../model/user')
const fs = require('fs')

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const emailcheck = await cekEmail(email)
      if (emailcheck.length < 1) {
        return response(res, 400, 'Email Not Found, Please Sign Up First')
      } else {
        const checkPassword = bcrypt.compareSync(
          password,
          emailcheck[0].password
        )
        if (emailcheck[0].status !== 1) {
          return response(res, 400, 'unverified email')
        } else {
          if (!checkPassword) {
            return response(res, 400, 'Wrong Password')
          } else {
            const {
              userId,
              userName,
              email,
              status,
              phoneNumber,
              bio,
              lat,
              lng,
              image
            } = emailcheck[0]
            const payload = {
              userId,
              userName,
              email,
              status,
              phoneNumber,
              bio,
              lat,
              lng,
              image
            }
            const token = jwt.sign(payload, 'sayang', {
              expiresIn: 7 * 24 * 60 * 60
            })
            const result = { ...payload, token }
            return response(res, 200, 'Login success', result)
          }
        }
      }
    } catch (error) {
      return response(res, 400, 'bad request', error)
    }
  },
  register: async (req, res) => {
    try {
      const { userName, email, password } = req.body

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(password, salt)

      const data = {
        userName,
        email,
        password: encryptPassword,
        status: 1
      }
      const emailcheck = await cekEmail(email)
      if (emailcheck.length > 0) {
        return response(res, 400, 'Email has been existed')
      }
      const result = await register(data)
      return response(res, 200, 'successful registration', result)
    } catch (error) {
      return response(res, 400, 'registration failed', error)
    }
  },
  patchUser: async (req, res) => {
    try {
      const { id } = req.params
      const { userName, phoneNumber, bio, lat, lng } = req.body
      const data = {
        userName,
        phoneNumber,
        bio,
        lat,
        lng,
        updatedAt: new Date()
      }
      const result = await patchUser(id, data)
      return response(res, 200, 'success patch data', result)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  },
  patchImage: async (req, res) => {
    try {
      const { id } = req.params
      const data = {
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
      return response(res, 200, 'Image Successfully Changed', result)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  },
  deleteImage: async (req, res) => {
    try {
      const { id } = req.params
      const unimage = await getUserById(id)
      const photo = unimage[0].image
      if (photo !== '') {
        fs.unlink(`./uploads/${photo}`, function (err) {
          if (err) throw err
        })
      }
      const data = {
        image: ''
      }
      const result = await patchUser(id, data)
      return response(res, 200, 'Image Successfully Deleted', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  }
}
