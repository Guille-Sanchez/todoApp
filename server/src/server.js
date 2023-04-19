import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRouter from './routes/userRoutes.js'
import todoRouter from './routes/todoRoutes.js'
import cors from 'cors'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/users', userRouter)
app.use('/api/todos', todoRouter)

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Server is running on port', process.env.PORT)
    })
  })
