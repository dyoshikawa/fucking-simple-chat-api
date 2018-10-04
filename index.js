const port = process.env.PORT || 3000
const io = require('socket.io')(port)

io.on('connection', function(socket) {
  console.log('connection')

  socket.on('open', function() {
    console.log('open')
    console.log(arguments)
  })

  socket.on('message', function() {
    console.log('message')
    console.log(arguments)
  })

  socket.on('disconnect', function() {
    console.log('disconnect')
  })
})
