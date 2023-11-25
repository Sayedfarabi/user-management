import express from 'express'
import { userControllers } from './user.controller'

const router = express.Router()

router.get('/', userControllers.getUsers)
router.get('/:userId', userControllers.getUser)
router.put('/:userId', userControllers.updateUser)
router.delete('/:userId', userControllers.deleteUser)
router.post('/', userControllers.createUser)
router.put('/:userId/orders', userControllers.addProduct)
router.get('/:userId/orders', userControllers.getUserOrders)
router.get('/:userId/orders/total-price', userControllers.getTotalPriceOfOrders)

export const UserRoutes = router
