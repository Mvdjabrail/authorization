const { Router } = require('express')
const { todoController } = require('../controllers/todo.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = Router()

router.get('/todo/:id', authMiddleware, todoController.getAllTodos)
router.post('/todo', authMiddleware, todoController.postTodo)
router.delete('/todo/:id', authMiddleware, todoController.deleteTodo)

module.exports = router;