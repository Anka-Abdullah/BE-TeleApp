const multer = require('multer')
const { response } = require('../helper/response')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') +
        file.originalname.split(' ').join('')
    )
  }
})
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true)
  } else {
    cb(new Error('Extension File Must Be PNG or JPG'))
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024
  }
}).single('image')

const uploadFilter = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err.message)
      return response(res, 400, err.message)
    } else if (err) {
      console.log(err.message)
      return response(res, 400, err.message)
    }
    next()
  })
}

module.exports = uploadFilter
