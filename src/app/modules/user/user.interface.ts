export type TFullName = {
  firstName: string
  lastName: string
}
export type TAddress = {
  street: string
  city: string
  country: string
}

export type TUser = {
  userId: number
  username: string
  password: string
  fullName: TFullName
  age: number
  email: string
  isActive: boolean
  hobbies: Array<string>
  address: TAddress
}

export type TOrder = {
  productName: string
  price: number
  quantity: number
}

export type TOrders = Array<TOrder>
