const port = process.env.PORT || 3000
const io = require('socket.io')(port)
const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres', 'postgres', 'secret', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  operatorsAliases: false,
})

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    field: 'name',
  },
  createdAt: {
    type: Sequelize.DATE,
    field: 'created_at',
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: 'updated_at',
  },
})

io.on('connection', function(socket) {
  console.log('connection')

  socket.on('open', function() {
    console.log('open')
    console.log(arguments)
  })

  socket.on('message', function() {
    console.log('message')
    console.log(arguments['0'])
    sequelize
      .sync()
      .then(() =>
        User.create({
          name: arguments['0'],
        })
      )
      .then(jane => {
        console.log(jane.toJSON())
      })
  })

  socket.on('disconnect', function() {
    console.log('disconnect')
  })
})
