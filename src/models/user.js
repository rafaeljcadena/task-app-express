const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

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
  }
})

// Crio um método estático para buscar os usuários pelo email e senha
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) throw new Error('Unable to login')
  const isMatch = await bcrypt.compare(password, user.password)
  
  if (!isMatch) throw new Error('Unable to login')

  return user;
}

// Callback que encripta o password passado pelo usuário
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