import express from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/user/user.route'
const app = express()

// parser
app.use(express.json())
app.use(cors())

// Api Routes
app.use('/api/users', UserRoutes)

export default app
