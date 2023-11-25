import { TOrder, TUser } from './user.interface'
import { User } from './user.model'

// User Management

const getAllUserFromDB = async () => {
  const result = await User.aggregate([
    { $match: {} },
    {
      $project: {
        _id: 0,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
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

const updateUserFromDB = async (userId: number, userData: TUser) => {
  if (await User.isUserExists(userId)) {
    const filter = {
      userId: userId,
    }
    const result = await User.findOneAndUpdate(filter, userData)
    return result
  } else {
    throw new Error('User is not exists')
  }
}

const deleteUserFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const filter = {
      userId: userId,
    }
    const result = await User.deleteOne(filter)
    // return result
    if (result.deletedCount > 0) {
      return null
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

// Order Management
const addProductIntoDB = async (userId: number, productData: TOrder) => {
  if (await User.isUserExists(userId)) {
    await User.updateOne({ userId }, { $push: { orders: productData } })
  } else {
    throw new Error('User is not Exists')
  }
}

const getUserOrdersIntoDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    // const result = await User.findOne({ userId })
    const result = await User.aggregate([
      { $match: { userId } },
      { $project: { _id: 0, orders: 1 } },
    ])
    return result[0]
  } else {
    throw new Error('User is not Exists')
  }
}

const getTotalPriceOfOrdersFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.aggregate([
      { $match: { userId } },
      { $unwind: '$orders' },
      {
        $group: {
          _id: '$_id',
          quantity: { $sum: '$orders.quantity' },
          avaragePrice: { $avg: '$orders.price' },
        },
      },
      {
        $project: {
          _id: 0,

          totalPrice: { $multiply: ['$quantity', '$avaragePrice'] },
        },
      },
    ])

    return result
  } else {
    throw new Error('User is not Exists')
  }
}

export const userServices = {
  getAllUserFromDB,
  createUserIntoDB,
  getUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
  addProductIntoDB,
  getUserOrdersIntoDB,
  getTotalPriceOfOrdersFromDB,
}
