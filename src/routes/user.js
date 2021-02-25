const router = require('express').Router()
const multer = require('../midleware/multer')
const {
  register,
  login,
  getUserById,
  patchUser,
  patchImage,
  deleteImage
} = require('../controller/user')
router.get('/:id', getUserById)
router.post('/register', register)
router.post('/login', login)
router.patch('/:id', patchUser)
router.patch('/image/:id', multer, patchImage)
router.delete('/image/:id', multer, deleteImage)

module.exports = router
