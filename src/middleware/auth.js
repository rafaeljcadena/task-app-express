const jwt = require('jsonwebtoken')
const User = require('../models/user')

// Está função é um middleware que pode ser passado nas rotas. Basta passar como parâmetro antes da função que contem a request e response
// Se houverem mais middlewares eles podem ser passados antes da função de request e response final
const auth = async (req, res, next) => {
  try {
    // O token é passado num header chamado 'Authorization', o valor contem o prefixo 'Bearer '. É apenas uma convenção
    const token = req.header('Authorization').replace('Bearer ', '')

    // Decodificamos o token através da lib jsonwebtoken passando também a chave que foi usada para encriptar os tokens que geramos
    // Essa chave posteriormente deve ir para as variáveis de ambiente do servidor
    const decoded = jwt.verify(token, 'thisismynewcourse')

    // Utilizamos o findONe dessa vez pq precisamos assegurar que estamos trazendo o usuário correto
    // Por isso passamos o _id e o token
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
    
    if(user){
      // Por se tratar de um middleware nós conseguimos adicionar propriedades ao objeto request
      // Essas propriedades estarão disponíveis nos middlewares seguintes e na função final que contem o request e o response
      req.user = user
      req.token = token
      
    } else {
      throw new Error()
    }

  } catch (e) {
    res.status(401).send({ error: 'Unathorized' })
  }
  next()
}

module.exports = auth;