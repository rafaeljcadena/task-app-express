const mongoose = require('mongoose');
// const validator = require('validator')

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api'
const databaseName = 'task-app'

mongoose.connect(connectionURL, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

// module.exports = {
//   mongoose 
// }

// const User = mongoose.model('User', { 
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validate(value){
//       if (!validator.isEmail(value)){
//         throw new Error('E-mail is invalid')
//       }
//     }
//   },
//   age: {
//     type: Number,
//     validate(value){
//       if(value < 0) {
//         throw new Error('Age must be a positive number')
//       }
//     }
//   },
//   password: {
//     type: String,
//     trim: true,
//     required: true,
//     minlength: 7,
//     validate(value){
//       if(value.toLowerCase() == 'password'){
//         throw new Error('Cannot be the word password')
//       }
//     }
//   }
// });

// const Task = mongoose.model('Task', {
//   description: {
//     type: String,
//     trim: true,
//     required: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   }
// });

// const user = new User({ name: 'José', password: '     ffsesef ', email: 'Z@Z.COM' });
// user.save().then(() => console.log(user));

// const task = new Task({ description: 'Do exercises'})
// task.save().then(() => console.log('success', task));
          