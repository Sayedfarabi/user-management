import { z } from 'zod'

const fullNameZodValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message:
          'First name must start with an uppercase letter and be in capitalize format',
      },
    ),
  lastName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last name must only contain alphabetic characters',
    }),
})

const addressZodValidationSchema = z.object({
  street: z.string().min(1).max(100),
  city: z.string().min(1).max(50),
  country: z.string().min(1).max(50),
})

const userZodValidationSchema = z.object({
  userId: z.number().int().positive('User id must be a positive integer'),
  username: z.string().min(1).max(50),
  password: z.string().min(8).max(100),
  fullName: fullNameZodValidationSchema,
  age: z.number().int().positive('User age must be a positive integer'),
  email: z.string().email('Invalid email format'),
  isActive: z.boolean(),
  hobbies: z
    .array(z.string().min(1).max(50))
    .min(1, 'User must have at least one hobby'),
  address: addressZodValidationSchema,
})

export default userZodValidationSchema
