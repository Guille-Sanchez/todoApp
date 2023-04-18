import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  todos: {
    type: [mongoose.Types.ObjectId],
    ref: 'Todo'
  }
},
{ timeStamps: true }
)

export const User = mongoose.model('User', userSchema)
