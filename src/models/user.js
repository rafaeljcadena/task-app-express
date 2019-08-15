const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Task = require('./task')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('E-mail is invalid')
      }
    }
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number')
      }
    }
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase() == 'password') {
        throw new Error('Cannot be the word password')
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

// Equivalente ao has_many do rails
// É preciso criar um atributo virtual para acessar os relations
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'user'
})

// Crio um método estático para buscar os usuários pelo email e senha
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) throw new Error('Unable to login')
  const isMatch = await bcrypt.compare(password, user.password)
  
  if (!isMatch) throw new Error('Unable to login')

  return user;
}

// Cria os métodos de instância dos objetos criados por esse schema
// No caso os métodos para instância de users!
// Todos os callbacks recebem funções no formato antigo "function(){}" para terem acesso ao 'this'. Arrow functions não tem o 'this' apontando para a classe
userSchema.methods.generateAuthToken = async function() {
  try {
    const user = this;

    // A propriedade _id retorna um ObjectID, então precisamos fazer um cast para String para receber o valor do ID em String
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token;
  } catch (e) {
    
  }
}

// Sobrescreve o método toJSON do objeto. Assim pode ser chamado normalmente nas rotas
// Dessa forma esse método será executado toda vez que um user for ser renderizado para json no servidor
userSchema.methods.toJSON = function(){
  const user = this
  // user.password = undefined
  // user.tokens = undefined

  // Retorna o objeto user do mongoose
  // Com isso podemos manipular o object de forma mais legível
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject;
}

userSchema.methods.getPublicProfile = function(){
  const user = this
  // user.password = undefined
  // user.tokens = undefined

  // Retorna o objeto user do mongoose
  // Com isso podemos manipular o object de forma mais legível
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject;
}

// Callback que encripta o password passado pelo usuário
// Todos os callbacks recebem funções no formato antigo "function(){}" para terem acesso ao 'this'. Arrow functions não tem o 'this' apontando para a classe
userSchema.pre('save', async function(next){
  const user = this;

  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8)
  }

  // Next é um método que avisa que o callback foi encerrado
  // Isso acontece pq podem haver funções assíncronas
  // Se o next() não for chamado o servidor fica parado nesta função para sempre
  next();
})

// Callback que remove as tasks quando um usuário for removido
userSchema.pre('remove', async function(next){
  const user = this;
  await Task.deleteMany({ user: user._id })

  next();
})


const User = mongoose.model('User', userSchema);
module.exports = User;