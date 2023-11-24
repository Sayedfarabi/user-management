import express from 'express'
import { userControllers } from './user.controller'

const router = express.Router()

router.get('/', userControllers.getUsers)
router.get('/:userId', userControllers.getUser)
router.post('/', userControllers.createUser)

export const UserRoutes = router
