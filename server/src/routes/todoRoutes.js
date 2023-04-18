import express from 'express'
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from '../controllers/todosController.js'

const router = express.Router()

router.get('/', getTodos)
router.get('/:id', getTodo)
router.post('/:userId', createTodo)
router.patch('/:id', updateTodo)
router.delete('/:id', deleteTodo)

export default router
