import { Schema, model } from 'mongoose'
import { TAddress, TFullName, TUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
})

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'User street property of address is required'],
  },
  city: {
    type: String,
    required: [true, 'User city property of address is required'],
  },
  country: {
    type: String,
    required: [true, 'User country property of address is required'],
  },
})

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, 'User id is required'],
    unique: true,
    index: true,
    trim: true,
  },
  username: {
    type: String,
    required: [true, 'User name is required'],
    unique: true,
    index: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'User Password is required'],
    trim: true,
  },
  fullName: {
    type: fullNameSchema,
    required: [true, 'User name is required'],
  },
  age: {
    type: Number,
    required: [true, 'User age is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'User email is required'],
    trim: true,
  },
  isActive: {
    type: Boolean,
    required: [true, 'User isActive field is required'],
    trim: true,
  },
  hobbies: {
    type: [String],
    required: [true, 'User hobbies is required'],
  },
  address: {
    type: addressSchema,
    required: [true, 'User address is required'],
  },
})

// Pre middleware for save password
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  )
  next()
})

// post middleware for saved password
userSchema.post('save', async function (doc, next) {
  doc.password = ''

  next()
})

userSchema.post('findOneAndUpdate', async function (doc, next) {
  doc.password = ''

  next()
})

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId })
  return existingUser
}

export const User = model<TUser, UserModel>('User', userSchema)
