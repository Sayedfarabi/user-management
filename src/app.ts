import express, { Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/user/user.route'
const app = express()

// parser
app.use(express.json())
app.use(cors())

// Api Routes
app.use('/api/users', UserRoutes)

const getAController = (req: Request, res: Response) => {
  res.send('Server side is already connected')
}

app.get('/', getAController)

export default app
