const router = require('express').Router()
const { get } = require('../controller/contact')
router.get('/', get)
module.exports = router
