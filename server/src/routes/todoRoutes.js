import express from 'express'
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from '../controllers/todosController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getTodos)
router.get('/:id', getTodo)
router.post('/', authMiddleware, createTodo)
router.patch('/:id', authMiddleware, updateTodo)
router.delete('/', authMiddleware, deleteTodo)

export default router
