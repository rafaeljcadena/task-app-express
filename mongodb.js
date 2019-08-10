// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

// Lib capaz de gerar ids aleatórios do Mongo
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-app'

// const id = new ObjectID();
// console.log(id)
// console.log(id.getTimestamp())

// Inicia a conexão com o Mongo
// Documentação dos métodos: http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if(error) console.log('Unable to connect to database!')

  // Não é necessário criar um banco.
  // O Mongo cria um banco automaticamente quando utiliza o método client.db
  // basta passar uma string com o nome do banco desejado
  const db = client.db(databaseName);

  // NOTE: INSERT
  // db.collection('users').insertOne({
  //   name: 'Vikram',
  //   age: 25
  // }, (error, result) => {
  //   if(error) console.log('Unable to insert user')
  //   console.log(result.ops)
  // });

  // db.collection('users').insertMany([
  //   { name: 'José', age: 26 }, 
  //   { name: 'Jen', age: 45}
  // ], (error, result) => {
  //   if(error) console.log('Unable to insert documents!')

  //   console.log(result.ops)

  // })

  // NOTE: READ
  // db.collection('users').findOne({ name: 'Jen' }, (error, user) => {
  //   if(error) console.log('Unable to fetch')
  //   console.log(user)
  // })
  
  // db.collection('users').findOne({ _id: ObjectID("5d3e7a6d662c650fd21e3f25") }, (error, user) => {
  //   if(error) console.log('Unable to fetch')
  //   console.log(user)
  // })

  // Método find retorna um objecto Cursor. A partir dele vc tem os métodos que tratam os dados
  // Como o toArray que retorna um array dos objetos
  // db.collection('users').find({ age: 30}).toArray((error, users) => {
  //   console.log(users)
  // })
  
  // Ou o método count que retorna um count da query
  // db.collection('users').find({ age: 30}).count((error, count) => {
  //   console.log(count)
  // })

  // db.collection('tasks').findOne({ _id: ObjectID("5d3e7bb2ef53f30fdd22f9ce")}, (error, task) => {
  //   console.log(task)
  // })
  // db.collection('tasks').find({ completed: true }).toArray((error, tasks) => {
  //   console.log(tasks)
  // });

  // NOTE: Update
  // db.collection('users').updateOne({ _id: ObjectID("5d3e770dc0e79a0fb4d324c7") }, { $set: { name: 'Rafael INCREMENTED' }, $inc: { age: 1 } })
  //                       .then(result => console.log(result) )
  //                       .catch(error => console.log(error) );
  // db.collection('tasks').updateMany({ completed: false }, { $set: { completed: true } })
  //                       .then(result => console.log(result.modifiedCount) )
  //                       .catch(error => console.log(error) );

  // NOTE: Delete
  // db.collection('users').deleteMany({ name: 'Andrea' })
  //                       .then(result => console.log(result.deletedCount))
  // db.collection('users').deleteOne({ age: 25 })
  //                       .then(result => console.log(result.deletedCount))
  db.collection('tasks').deleteOne({ description: 'Sleep soon'})
                        .then(result => console.log(result.deletedCount))
});

