const apiRouter = require('express').Router()
const todoController = require('./controllers/todoController')
const cors = require('cors')

apiRouter.use(cors())

apiRouter.get('/', (req, res) => res.json('Test running'))

apiRouter.get('/todos', todoController.apiGet)
apiRouter.post('/todos', todoController.apiCreate)
apiRouter.put('/todos/:id', todoController.apiUpdate)
apiRouter.delete('/todos/:id', todoController.apiDelete)

module.exports = apiRouter
