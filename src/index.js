const express = require('express')
require('./db/mongoose')
// const User = require('./models/user')
// const Task = require('./models/task')

const usersRouter = require('./routers/users')
const tasksRouter = require('./routers/tasks')

const app = express()
// const port = process.env.PORT
// console.log(process.env.PORT)

// o método 'use' pode ser usado para definir middlewares
// são funções que serão executadas antes das requisições chegarem até as rotas
// dentro dos middlewares também temos acesso a função response. Que pode ser utilizada antes de chegar até as rotas de fato
app.use((req, res, next) => {
  // if(req.method === 'GET'){
  //   res.send('GET requests are disabled')
  // } else {
    next()
  // }
  // a função next serve para avisar quando o bloco desta funções foi executado por completo
  // é feito dessa forma pq em alguns casos lidamos com funções assíncronas
  // sendo ao chamar a função next nós damos por encerrada a função atual e o fluxo continua

})

// Exemplo de middleware
// Modo Manutenção
// app.use((req, res, next) => {
//   res.status(503).send('Maintence Mode')
//   next()
// })

// const multer = require('multer')
// const upload = multer({
//   dest: 'images'
// })

// app.post('/upload', upload.single('upload'), (req, res) => {
//   res.send()
// })

// Faz com que o express converta os parametros para JSON
app.use(express.json())

// Importa as rotas definidas em outro arquivo
app.use(usersRouter)
app.use(tasksRouter)

app.listen(process.env.PORT, () => {
  console.log('Server is up on port ' + process.env.PORT)
})

// const Task = require('./models/task')
// const User = require('./models/user')

