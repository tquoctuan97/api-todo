const todosCollection = require('../db').db().collection('items')
const sanitizeHTML = require('sanitize-html')
const ObjectID = require('mongodb').ObjectID

let Todo = function (data, requestedTodoId) {
  this.data = data
  this.errors = []
  this.requestedTodoId = requestedTodoId
}

Todo.prototype.cleanUp = function () {
  if (typeof this.data.text != 'string') {
    this.data.text = ''
  }
  if (typeof this.data.complete != 'boolean') {
    this.data.complete = ''
  }
  if (typeof this.data.author != 'string') {
    this.data.author = ''
  }

  // get rid of any bogus properties
  this.data = {
    text: sanitizeHTML(this.data.text.trim(), { allowedTags: [], allowedAttributes: {} }),
    complete: this.data.complete,
    author: sanitizeHTML(this.data.author.trim(), { allowedTags: [], allowedAttributes: {} }),
    createdDate: new Date()
  }
}

Todo.prototype.validate = function () {
  if (this.data.text === '') {
    this.errors.push('You must provide todo content')
  }
  if (this.data.complete === '') {
    this.errors.push('You must provide a status complete of todo.')
  }
  if (this.data.author === '') {
    this.errors.push('You must provide an author of todo ')
  }
}

Todo.prototype.create = function () {
  return new Promise((resolve, reject) => {
    this.cleanUp()
    this.validate()
    if (!this.errors.length) {
      // save post into database
      todosCollection
        .insertOne(this.data)
        .then(info => {
          resolve(info.ops[0]._id)
        })
        .catch(e => {
          this.errors.push('Please try again later.')
          reject(this.errors)
        })
    } else {
      reject(this.errors)
    }
  })
}

Todo.prototype.update = function () {
  return new Promise(async (resolve, reject) => {
    try {
      this.cleanUp()
      this.validate()
      if (!this.errors.length) {
        await todosCollection.findOneAndUpdate({ _id: new ObjectID(this.requestedTodoId) }, { $set: { text: this.data.text, complete: this.data.complete, author: this.data.author } })
        resolve('success')
      } else {
        resolve('failure')
      }
    } catch (e) {
      reject()
    }
  })
}

Todo.delete = function (todoIdToDelete) {
  return new Promise(async (resolve, reject) => {
    try {
      await todosCollection.deleteOne({ _id: new ObjectID(todoIdToDelete) })
      resolve()
    } catch (e) {
      reject()
    }
  })
}

Todo.get = function () {
  return new Promise(async (resolve, reject) => {
    try {
      let todos = await todosCollection.find().toArray()
      resolve(todos)
    } catch (e) {
      reject()
    }
  })
}

module.exports = Todo
