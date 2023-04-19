import express from 'express'
import { createUser, deleteUser, getUser, getUsers, loginUser, logoutUser, updateUser } from '../controllers/usersController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.patch('/', authMiddleware, updateUser)
router.delete('/', authMiddleware, deleteUser)
router.post('/login', loginUser)
router.post('/logout', authMiddleware, logoutUser)

export default router
