import mongoose from 'mongoose'
const Schema = mongoose.Schema

const todoSchema = new Schema({
  body: { type: String, required: true },
  userId: {
    type: [mongoose.Types.ObjectId],
    ref: 'User'
  }
},
{ timeStamps: true }
)

export const Todo = mongoose.model('Todo', todoSchema)
