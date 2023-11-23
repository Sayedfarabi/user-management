import { TUser } from './user.interface'
import { User } from './user.model'

const getAllUserFromDB = async () => {
  const result = await User.find()
  return result
}

const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData)
  return result
}

export const userServices = {
  getAllUserFromDB,
  createUserIntoDB,
}
