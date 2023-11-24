import express from 'express'
import { userControllers } from './user.controller'

const router = express.Router()

router.get('/', userControllers.getUsers)
router.get('/:userId', userControllers.getUser)
router.put('/:userId', userControllers.updateUser)
router.delete('/:userId', userControllers.deleteUser)
router.post('/', userControllers.createUser)

export const UserRoutes = router
