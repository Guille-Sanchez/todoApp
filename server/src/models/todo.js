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

todoSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject._id
    delete returnObject.__v
  }
})

export const Todo = mongoose.model('Todo', todoSchema)
