const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
  const { description } = req.body;
  // const task = new Task({ description })
  const task = new Task({...req.body, user: req.user._id})

  try {
    const savedTask = await task.save();
    res.status(201);
    res.send(task)
  } catch (e) {
    res.status(422);
    res.send(e);
  }

  // task.save().then(() => {
  //   res.status(201);
  //   res.send(task)
  // })
  // .catch((e) => {
  //   res.status(422);
  //   res.send(e);
  // })
})

router.patch('/tasks/:id', auth, async (req, res) => {
  const params = Object.keys(req.body)
  const allowedUpdated = ['description']

  if (params.find(p => !allowedUpdated.includes(p))) {
    return res.status(400).send({ error: 'Invalid update params' })
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id })
    if (!task) res.status(404).send() 

    params.forEach(update => task[update] = req.body[update])
    await task.save()
    
    res.send(task)
  } catch (error) {
    res.status(500)
    res.send(error)
  }

})

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    // const task = await Task.findByIdAndDelete(req.params.id)
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id})
    task ? res.send(task) : res.status(404).send({ message: 'Not Found' })
  } catch (error) {
    res.status(500)
    res.send()
  }
})

router.get('/tasks', auth, async (req, res) => {
  // Crio um objeto match para, a partir de algumas verificações,
  // ir colocando algumas propriedades nesse objeto e passo dentro do método populate
  // para filtrar as tasks que vão ser associadas a seu usuário
  const match = {}

  if (req.query.completed) match.completed = req.query.completed === 'true'
  
  try {
    // const tasks = await Task.find({ user: req.user._id })
    // res.send(tasks)
    
    // Populando o usuário que veio com o middleware auth com suas tasks
    // await req.user.populate('tasks').execPopulate()
    
    await req.user.populate({
      path: 'tasks',
      match
    }).execPopulate()
    res.send(req.user.tasks)
  } catch (e) {
    res.status(500)
    res.send()
  }
  // Task.find({}).then(tasks => {
  //   res.status(200)
  //   res.send(tasks)
  // })
})

router.get('/tasks/:id', auth, async (req, res) => {
  try {
    const _id = req.params.id
    const task = await Task.findOne({ _id, user: req.user._id })
    task ? res.send(task) : res.status(404).send();
  } catch (error) {
    res.status(500)
    res.send()
  }
  // const _id = req.params.id
  // Task.findById(_id)
  //     .then(task => {
  //       task ? res.send(task) : res.status(404).send();
  //     })
  //     .catch(e => {
  //       res.status(500)
  //       res.send()
  //     })
})

module.exports = router