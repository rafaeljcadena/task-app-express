// Faz com que o express converta os parametros para JSON
app.use(express.json())

app.post('/users', (req, res) => {
  const user = new User(req.body);
  user.save().then(() => {
    res.status(201);
    res.send(user);
  })
    .catch((e) => {
      res.status(422);
      res.send(e);
    });
  // res.send('testing')
})

app.post('/tasks', (req, res) => {
  const { description } = req.body;
  const task = new Task({ description })
  task.save().then(() => {
    res.status(201);
    res.send(task)
  })
    .catch((e) => {
      res.status(422);
      res.send(e);
    })
})