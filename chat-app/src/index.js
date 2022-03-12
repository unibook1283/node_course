const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

let count = 0


io.on('connection', (socket) => {   // 'connection': 연결되었을 때 다음을 실행 (builtin)
    console.log('New WebSocket connection')

    // socket.emit('countUpdated', count)

    // socket.on('increment', () => {
    //     count++
    //     // socket.emit('countUpdated', count)   // 한 명한테만 보냄
    //     io.emit('countUpdated', count)          // 모두한테 보냄
    // })

    socket.emit('message', 'Welcome!')
    socket.broadcast.emit('message', 'A new user has joined!')  // broadcast: 해당 유저 외의 모든 유저에게

    socket.on('sendMessage', (message, callback) => {   // callback for acknowledgement
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.emit('message', message)
        callback('Delivered!')
    })

    socket.on('sendLocation', (location, callback) => {
        io.emit('message', `https://google.com/maps?q=${location.lat},${location.lng}`)
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })
})

server.listen(port, () => {
    console.log(`Server is listen on port ${port}`)
})