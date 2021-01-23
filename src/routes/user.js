const router = require('express').Router()
const multer = require('../midleware/multer')
const {
  register,
  login,
  patchUser,
  patchImage,
  deleteImage
} = require('../controller/user')
// const {auth} =require('../midleware/auth')

router.post('/register', register)
router.post('/login', login)
router.patch('/:id', patchUser)
router.patch('/image/:id', multer, patchImage)
router.delete('/image/:id', multer, deleteImage)

module.exports = router
