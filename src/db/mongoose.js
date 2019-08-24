const mongoose = require('mongoose');

// ATENÇÃO: o password n pode conter caracteres especiais como o "@"
// Na dúvida utilize o gerador de password do mongo atlas
const connectionURL = process.env.MONGO_URL
const databaseName = 'task-app'

mongoose.connect(connectionURL, { 
  useNewUrlParser: true, 
  useCreateIndex: true, 
  useFindAndModify: false 
});