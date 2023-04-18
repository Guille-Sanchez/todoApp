import { User } from '../models/user.js'

export const getUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

export const getUser = (req, res) => {
  User.find({ _id: req.params.id })
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

export const createUser = (req, res) => {
  const newUser = new User(req.body)

  newUser.save()
    .then((saveUser) => {
      if (saveUser) {
        res.status(201).json(saveUser)
      }
    })
    .catch((err) => {
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
