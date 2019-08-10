require('../src/db/mongoose')
const Task = require('../src/models/task')

// 5d4130fd7299ed06f26039a3
// Task.findByIdAndDelete('5d4130b3bf0f4206ed9c4743')
//     .then(task => {
//       console.log(task)
//       return Task.countDocuments({ completed: false })
//     })
//     .then(resultCount => {
//       console.log(resultCount)
//     })
//     .catch(e => console.log(e))

// const add = (a, b) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(a + b);
//     }, 2000);
//   })
// }

// add(1, 2).then((sum) => {
//   console.log(sum)
//   return add(sum, 4)
// }).then(sum => {
//   console.log(sum)
// }).catch(e => {
//   console.log(e)
// }) 

const findAndDelete = async (id) => {
  const task = await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({ completed: false })
  return count
}

findAndDelete('5d4130fd7299ed06f26039a3')
  .then(count => console.log(count))
  .catch(e => console.log(e))
