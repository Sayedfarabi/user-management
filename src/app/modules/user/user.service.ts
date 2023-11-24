import { TUser } from './user.interface'
import { User } from './user.model'

const getAllUserFromDB = async () => {
  const result = await User.aggregate([
    { $match: {} },
    { $project: { username: 1, fullName: 1, age: 1, email: 1, address: 1 } },
    { $sort: { username: 1 } },
  ])
  return result
}

const getUserFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.aggregate([
      { $match: { userId: userId } },
      {
        $project: {
          userId: 1,
          username: 1,
          fullName: 1,
          age: 1,
          email: 1,
          isActive: 1,
          hobbies: 1,
          address: 1,
        },
      },
      { $sort: { userId: 1 } },
    ])
    if (result.length > 0) {
      return result[0]
    } else {
      return result
    }
    return result
  } else {
    throw new Error('User is not exists')
  }
}

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User Alredy Exists')
  }

  const result = await User.create(userData)

  return result
}

export const userServices = {
  getAllUserFromDB,
  createUserIntoDB,
  getUserFromDB,
}
