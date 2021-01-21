const router = require('express').Router()
const user = require('./routes/user')
const contact = require('./routes/contact')

router.use('/user', user)
router.use('/contact', contact)
module.exports = router
