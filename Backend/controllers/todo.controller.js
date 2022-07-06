const Todo = require('../models/Todo.model')
const jwt = require('jsonwebtoken')


module.exports.todoController = {

    deleteTodo: async (req, res) => {
        const { id } = req.params

        try {

            const todo = await Todo.findById(id)

            if (todo.user.toString() === req.user.id) {
                await todo.remove()
                return res.json('Удалено')
            }
            res.status(401).json('Ошибка. Нет доступа')

        } catch (e) {
            return res.status(401).json('Ошибка: '+ e.toString())
        }
    },

    getAllTodos: async (req, res) => {
        const todo = await Todo.find({user:req.params.id})
        res.json(todo)
    },
    postTodo: async (req, res) => {
        const { text } = req.body

        try {

            const todo = await Todo.create({
                user: req.user.id,
                text,
            })

            return res.json(todo)

        } catch (e) {
            return res.status(401).json(e.toString())
        }
    }
}