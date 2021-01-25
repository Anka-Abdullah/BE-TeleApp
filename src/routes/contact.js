const router = require('express').Router()
const { get, getFriend, post } = require('../controller/contact')
router.get('/', get)
router.get('/friend/:id', getFriend)
router.post('/', post)
module.exports = router
