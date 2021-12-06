const apiRouter = require('express').Router()
const todoController = require('./controllers/todoController')
const cors = require('cors')

apiRouter.use(cors())

apiRouter.get('/', (req, res) => res.json('Test server successfully. Checkout code here: https://github.com/tquoctuan97/api-todo'))

apiRouter.get('/todos', todoController.apiGet)
apiRouter.post('/todos', todoController.apiCreate)
apiRouter.post('/todos/:id', todoController.apiUpdate)
apiRouter.delete('/todos/:id', todoController.apiDelete)

module.exports = apiRouter
