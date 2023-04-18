import { User } from '../models/user.js'
import bcrypt from 'bcrypt'

export const getUsers = (req, res) => {
  User.find()
    .then((users) => {
      const formattedUsers = users.map((user) => {
        console.log(user)

        const formattedUser = user.toJSON()
        delete formattedUser.password
        delete formattedUser.__v
        return formattedUser
      })
      console.log(formattedUsers)
      res.status(200).json(formattedUsers)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

export const getUser = (req, res) => {
  User.find({ _id: req.params.id }).populate('todos')
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

export const createUser = (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400).json({
      message: 'Please provide all required fields'
    }).end()
    return
  }

  bcrypt.hash(password, 10)
    .then((hashPassword) => {
      console.log(hashPassword)
      const newUser = new User({
        name,
        email,
        password: hashPassword
      })

      newUser.save()
        .then((savedUser) => {
          if (savedUser) {
            const userWithoutPassword = savedUser.toJSON()
            delete userWithoutPassword.password
            res.status(201).json(userWithoutPassword)
          }
        })
        .catch((err) => {
          res.status(400).json(err)
        })
    }).catch((err) => {
      res.status(400).json(err)
    })
}

export const updateUser = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

export const deleteUser = (req, res) => {
  User.findByIdAndDelete({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Resource deleted successfully'
      })
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}
