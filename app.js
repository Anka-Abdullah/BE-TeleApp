require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const routesNavigation = require('./src/routesNavigation')
const socket = require('socket.io')

const http = require('http')
const server = http.createServer(app)
const io = socket(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  socket.on('globalMessage', (data) => {
    console.log(data)
    io.emit('chatMessage', data)
  })
  socket.on('privateMessage', (data) => {
    socket.emit('chatMessage', data)
  })
  socket.on('broadcastMessage', (data) => {
    socket.broadcast.emit('chatMessage', data)
  })
  socket.on('joinRoom', (data) => {
    console.log(data)
    socket.join(data.room)
  })
  socket.on('changeRoom', (data) => {
    console.log(data)
    socket.leave(data.oldRoom)
    socket.join(data.room)
  })
  socket.on('roomMessage', (data) => {
    console.log(data)
    io.to(data.room).emit('chatMessage', data)
  })
  socket.on('typing', (data) => {
    socket.broadcast.to(data.room).emit('typingMessage', data)
  })
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())
app.use(express.static('uploads'))
app.use('/', routesNavigation)

app.get('*', (req, res) => {
  res.status(404).send('path not found!')
})

const port = process.env.PORT

server.listen(port, () => {
  console.log('Server is running')
})
