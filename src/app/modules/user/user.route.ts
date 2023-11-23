import express from 'express'
import { userControllers } from './user.controller'

const router = express.Router()

router.get('/', userControllers.getUsers)
router.post('/', userControllers.createUser)

export const UserRoutes = router
