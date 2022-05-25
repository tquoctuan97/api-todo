const apiRouter = require('express').Router()
const todoController = require('./controllers/todoController')
const cors = require('cors')

apiRouter.use(cors())

apiRouter.get('/', (req, res) => res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>body { font-family: 'Arial', sans-serif }</style>
</head>
<body>
  <h1>Test server successfully. </h1>
  <p>Postman: <a rel="noopener noreferrer" href="https://documenter.getpostman.com/view/7316398/UVJigYzf">https://documenter.getpostman.com/view/7316398/UVJigYzf</a></p>
  <p>Github: <a rel="noopener noreferrer" href="https://github.com/tquoctuan97/api-todo">https://github.com/tquoctuan97/api-todo</a></p>
</body>
</html>  
`))

apiRouter.get('/todos', todoController.apiGet)
apiRouter.post('/todos', todoController.apiCreate)
apiRouter.post('/todos/:id', todoController.apiUpdate)
apiRouter.delete('/todos/:id', todoController.apiDelete)

module.exports = apiRouter
