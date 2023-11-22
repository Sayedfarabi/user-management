import { Request, Response } from 'express'
import { userServices } from './user.service'

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

export const userControllers = {
  getUsers,
}
