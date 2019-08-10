const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

const User = mongoose.model('User', userSchema);

module.exports = User;