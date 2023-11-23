import { Schema, model } from 'mongoose'
import { TAddress, TFullName, TUser } from './user.interface'

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

export const User = model<TUser>('User', userSchema)
