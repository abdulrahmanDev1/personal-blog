const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const Factory = require('./Factory')

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id
  next()
}

exports.getAllUsers = Factory.getAll(User)

exports.getUser = Factory.getOne(User)

exports.updateUser = Factory.updateOne(User)
