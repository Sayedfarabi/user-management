import { Request, Response } from 'express'
import { userServices } from './user.service'
import userZodValidationSchema from './user.zod.validation'

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUserFromDB()
    res.status(200).json({
      success: true,
      message: 'All user get successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    })
  }
}
const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const result = await userServices.getUserFromDB(Number(userId))
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    })
  }
}
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const userData = req.body
    const result = await userServices.updateUserFromDB(Number(userId), userData)
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await userServices.deleteUserFromDB(Number(userId))
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    })
  }
}

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body
    const userZodParseData = userZodValidationSchema.parse(user)
    const result = await userServices.createUserIntoDB(userZodParseData)
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    })
  }
}

// Order Management

const addProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const productData = req.body
    await userServices.addProductIntoDB(Number(userId), productData)
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    })
  }
}

const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await userServices.getUserOrdersIntoDB(Number(userId))
    res.status(200).json({
      success: true,
      message: 'Order fatched successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    })
  }
}

const getTotalPriceOfOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await userServices.getTotalPriceOfOrdersFromDB(
      Number(userId),
    )

    if (result.length > 0) {
      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: result[0],
      })
    } else {
      res.status(200).json({
        success: true,
        message: 'You have no order product yet!',
        data: {
          totalPrice: 0,
        },
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}

export const userControllers = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  addProduct,
  getUserOrders,
  getTotalPriceOfOrders,
}
