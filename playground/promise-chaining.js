require('../src/db/mongoose')
const User = require('../src/models/user')

// 5d43d135e9a0b90460fd5f61
// 5d478dcf8de2d50d1311e4a5
// User.findByIdAndUpdate('5d478dcf8de2d50d1311e4a5', { age: 1 })
//     .then(user => {
//       console.log(user)
//       return User.countDocuments({ age: 1 })
//     })
//     .then(resultCount => {
//       console.log(resultCount)
//     })
//     .catch(e => console.log(e))

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age: age })
  const resultCount = await User.countDocuments({ age: age })
  return resultCount
}

// ObjectId("5d478dcf8de2d50d1311e4a5")
updateAgeAndCount("5d478dcf8de2d50d1311e4a5", 2).then(count => {
  console.log(count);
}).catch(e => console.log(e))



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