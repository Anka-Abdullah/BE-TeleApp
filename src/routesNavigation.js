const router = require('express').Router()
const user = require('./routes/user')
const contact = require('./routes/contact')
const msg = require('./routes/message')

router.use('/user', user)
router.use('/contact', contact)
router.use('/msg', msg)
module.exports = router
