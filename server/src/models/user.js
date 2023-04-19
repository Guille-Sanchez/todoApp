import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, index: true, unique: true, required: true },
  password: { type: String, required: true },
  todos: {
    type: [mongoose.Types.ObjectId],
    ref: 'Todo'
  }
  },
  { timeStamps: true }
)


// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(mongooseUniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject._id
    delete returnObject.__v
  }
})

export const User = mongoose.model('User', userSchema)
