const Todo = require('../models/Todo')

exports.apiCreate = function (req, res) {
  let todo = new Todo(req.body)
  todo
    .create()
    .then(newId => {
      res.json(newId)
    })
    .catch(errors => {
      res.json(errors)
    })
}

exports.apiUpdate = function (req, res) {
  let todo = new Todo(req.body, req.params.id)
  todo
    .update()
    .then(status => {
      // the post was successfully updated in the database
      // or user did have permission, but there were validation errors
      if (status == 'success') {
        res.json('Success')
      } else {
        res.json('Failure')
      }
    })
    .catch(e => {
      // a post with the requested id doesn't exist
      // or if the current visitor is not the owner of the requested post
      res.json('Error: ' + e)
    })
}

exports.apiDelete = function (req, res) {
  Todo.delete(req.params.id)
    .then(() => {
      res.json('Success')
    })
    .catch(e => {
      res.json('Error: ' + e)
    })
}

exports.apiGet = async function (req, res) {
  try {
    let todoList = await Todo.get()
    res.json(todoList)
  } catch (e) {
    res.json(e)
  }
}
