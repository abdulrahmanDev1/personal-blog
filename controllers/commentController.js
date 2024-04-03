const Comment = require('../models/commentModel')
const Factory = require('./Factory')

exports.checkBody = (req, res, next) => {
  if (!req.body.body) {
    return res.status(400).json({
      status: 'fail',
      message: 'Comment body is required'
    })
  }
  next()
}

exports.getAllComments = Factory.getAll(Comment)

exports.getComment = Factory.getOne(Comment)

exports.createComment = Factory.createOne(Comment)

exports.updateComment = Factory.updateOne(Comment)

exports.deleteComment = Factory.deleteOne(Comment)
