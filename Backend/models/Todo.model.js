const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    text: String,
    user: {
        ref: 'User',
        type: mongoose.SchemaTypes.ObjectId
    }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo