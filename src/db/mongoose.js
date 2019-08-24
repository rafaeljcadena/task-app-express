const mongoose = require('mongoose');

const connectionURL = process.env.MONGO_URL
const databaseName = 'task-app'

mongoose.connect(connectionURL, { 
  useNewUrlParser: true, 
  useCreateIndex: true, 
  useFindAndModify: false 
});