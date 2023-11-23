import { Request, Response } from 'express'
import { userServices } from './user.service'
import userZodValidationSchema from './user.zod.validation'

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUserFromDB()
    res.status(200).json({
      success: true,
      message: 'All user get successfully',
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
      message: 'User created successfully',
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

export const userControllers = {
  getUsers,
  createUser,
}
