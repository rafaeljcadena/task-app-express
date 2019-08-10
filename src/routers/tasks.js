const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.post('/tasks', async (req, res) => {
  const { description } = req.body;
  const task = new Task({ description })

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

router.patch('/tasks/:id', async (req, res) => {
  const params = Object.keys(req.body)
  const allowedUpdated = ['description']

  if (params.find(p => !allowedUpdated.includes(p))) {
    return res.status(400).send({ error: 'Invalid update params' })
  }

  try {
    const task = await Task.findById(req.params.id)
    params.forEach(update => task[update] = req.body[update])
    await task.save()
    
    task ? res.send(task) : res.status(404).send()
  } catch (error) {
    res.status(500)
    res.send(error)
  }

})

router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    task ? res.send(task) : res.status(404).send({ message: 'Not Found' })
  } catch (error) {
    res.status(500)
    res.send()
  }
})

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200)
    res.send(tasks)
  } catch (e) {
    res.status(500)
    res.send()
  }
  // Task.find({}).then(tasks => {
  //   res.status(200)
  //   res.send(tasks)
  // })
})

router.get('/tasks/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const task = await Task.findById(_id)
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