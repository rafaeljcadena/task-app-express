const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const bcrypt = require('bcryptjs');

router.post('/users', async (req, res) => {
  const { name, email, age, password } = req.body

  try {
    const user = new User({ name, email, age, password });
    const token = await user.generateAuthToken()
    const savedUser = await user.save()
    
    res.status(201);
    res.send({ savedUser, token })
  } catch (e) {
    res.status(422);
    res.send(e);
  }
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.send(e)
  }
})

router.get('/users', async (req, res) => {

  try {
    const users = await User.find({})
    res.send(users);
  } catch (e) {
    res.status(500)
    res.send()
  }
  // User.find({}).then((users) => {
  //   res.send(users);
  // })
})

router.get('/users/:id', async (req, res) => {

  // NOTE: o findById tem que receber uma string de exatamente 24 caracteres, senão levanta uma excessão
  try {
    const user = User.findById(req.params.id)
    user ? res.send(user) : res.status(404).send();
  } catch (e) {
    res.status(500)
    res.send();
  }

  // User.findById(req.params.id)
  //     .then(user => {
  //       user ? res.send(user) : res.status(404).send();
  //     })
  //     .catch(e => {
  //       res.status(500)
  //       res.send();
  //     })
})

router.patch('/users/:id', async (req, res) => {
  const params = Object.keys(req.body)
  const allowedUpdated = ['name', 'email', 'password', 'age']

  if (params.find((p) => !allowedUpdated.includes(p))) {
    res.status(400)
    res.send({ error: 'Invalid update params' });
  }

  try {

    // a propriedade 'new' faz com que, após a atualização, o usuário modificado seja retornado
    // sem a propriedade 'new' o valor anterior será retornado pelo método
    // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
    const user = await User.findById(req.params.id)
    params.forEach(update => user[update] = req.body[update])
    const savedUser = await user.save();
    
    savedUser ? res.send(savedUser) : res.send(404).send()
  } catch (e) {
    res.status(500)
    res.send(e);
  }
})

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    user ? res.send(user) : res.status(404).send({ message: 'Not found' })
  } catch (error) {
    res.status(500)
    res.send()
  }
})

module.exports = router