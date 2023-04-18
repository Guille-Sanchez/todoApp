import { Todo } from '../models/todo.js'
import { User } from '../models/user.js'

export const getTodos = (req, res) => {
  Todo.find()
    .then((todos) => {
      res.status(200).json(todos)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

export const getTodo = (req, res) => {
  Todo.find({ _id: req.params.id })
    .then((todo) => {
      res.status(200).json(todo)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

export const createTodo = (req, res) => {
  const { body } = req.body
  const userId = req.params.userId

  if (!body || !userId) {
    res.status(400).json({
      message: 'Please provide all required fields'
    }).end()
    return
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(400).json({
          message: 'User not found'
        }).end()
        return
      }

      const newTodo = new Todo({
        body,
        userId
      })

      newTodo.save()
        .then((savedTodo) => {
          if (savedTodo) {
            user.todos.push(savedTodo)
            user.save().then(() => {
              res.status(201).json(savedTodo)
            })
          }
        })
        .catch((err) => {
          res.status(400).json(err)
        })
    })
}

export const updateTodo = (req, res) => {
  Todo.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
    .then((todo) => {
      res.status(200).json(todo)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

export const deleteTodo = (req, res) => {
  Todo.findByIdAndDelete({ _id: req.params.id })
    .then((todo) => {
      User.findOneAndUpdate({ _id: todo.userId }, { $pull: { todos: req.params.id } })

      res.status(200).json({
        success: true,
        message: 'Resource deleted successfully'
      })
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}
