import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRouter from './routes/userRoutes.js'

dotenv.config()
const app = express()
app.use(express.json())

app.use('/api/users', userRouter)

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Server is running on port', process.env.PORT)
    })
  })
