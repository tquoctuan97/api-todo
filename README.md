# A Simple API CRUD Todo List
Built with Node, Express and MongoDB Atlas

### Access To the Postman Document

Visit ==> [https://todos-restful-api.herokuapp.com/](https://documenter.getpostman.com/view/7316398/UVJigYzf)

### Todos API 

Send a Get request to `https://api-todo-vinova.herokuapp.com/todos` 

##### Result for GET ./todos:

```
[
    {
        "_id": "628dfbdf8fbe10000468dde1",
        "text": "Học Redux",
        "complete": false,
        "author": "Daniel",
        "createdDate": "2022-05-25T09:50:23.371Z"
    },
    {
        "_id": "628dfbe68fbe10000468dde2",
        "text": "Học React",
        "complete": false,
        "author": "Daniel",
        "createdDate": "2022-05-25T09:50:30.811Z"
    }
]
```

#### Todo arttibutes:

| Attribute | **Type** | **Description** |
| --- | --- | --- |
| `text` (required) | string | The content of a to-do |
| `complete` (required) | boolean | The status complete of a to-do |
| `author` (required) | string | The author of a to-do |
