const router = require('express').Router()

const {
  getMsg,
  getRoom,
  createMsg,
  createRoom,
  deleteMsg
} = require('../controller/message')

router.get('/', getMsg)
router.post('/', createMsg)
router.post('/room/', createRoom)
router.patch('/:id', deleteMsg)

module.exports = router
