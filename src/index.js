const express = require('express')
require('./db/mongoose')
// const User = require('./models/user')
// const Task = require('./models/task')

const usersRouter = require('./routers/users')
const tasksRouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT || 3000

// Faz com que o express converta os parametros para JSON
app.use(express.json())
app.use(usersRouter)
app.use(tasksRouter)

app.listen(port, () => {
  console.log('Server is up on port' + port)
})

// const myFunction = async () => {
//   const password = 'Red12345!'
//   const hashedPassword = await bcrypt.hash(password, 8)

//   console.log(password)
//   console.log(hashedPassword)

//   const isMatch = await bcrypt.compare('red12345!', hashedPassword)
//   console.log('isMatch: ', isMatch)
// }

// myFunction()
