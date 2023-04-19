import { User } from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getUsers = (req, res) => {
  User.find()
    .then((users) => {
      const formattedUsers = users.map((user) => {
        const formattedUser = user.toJSON()
        delete formattedUser.password
        return formattedUser
      })
      res.status(200).json(formattedUsers)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

export const getUser = (req, res) => {
  User.find({ _id: req.params.id }).populate('todos')
    .then((user) => {
      const formattedUser = user[0].toJSON()

      delete formattedUser.password
      res.status(200).json(formattedUser)
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
  const userId = req.userId
  if (!userId) {
    res.status(401).res({
      message: 'Unauthorized'
    }).end()
  }

  User.findOneAndUpdate({ _id: userId }, { $set: req.body }, { new: true }, { runValidators: true, context: 'query' })
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

export const deleteUser = (req, res) => {
  const userId = req.userId
  if (!userId) {
    res.status(401).res({
      message: 'Unauthorized'
    }).end()
  }

  User.findByIdAndDelete({ _id: userId })
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

export const loginUser = (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).json({
      message: 'Please provide all required fields'
    }).end()
    return
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(400).json({
          message: 'User not found'
        })
        return
      }

      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            res.status(401).json({
              message: 'Invalid credentials'
            })
            return
          }
          const userWithoutPassword = user.toJSON()
          delete userWithoutPassword.password

          // Create a JWT token with the user ID as the payload
          const token = jwt.sign({ userId: user._id, email },
            process.env.JWT_KEY,
            { expiresIn: '30m' })

          // Send the token to the client
          res.status(200).json({ token })
        })
        .catch((err) => {
          res.status(400).json(err)
        })
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

export const logoutUser = (req, res) => {
  res.clearCookie('token')
  res.status(200).json({ message: 'Logout successful' })
}
