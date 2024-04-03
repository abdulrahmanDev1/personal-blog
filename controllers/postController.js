const Post = require('../models/postModel')
const catchAsync = require('../utils/catchAsync')
const Factory = require('./Factory')

exports.checkBody = (req, res, next) => {
  if (!req.body.title || !req.body.body) {
    return res.status(400).json({
      status: 'fail',
      message: 'title and body are required'
    })
  }
  next()
}

exports.getAllPosts = Factory.getAll(Post)

exports.getPost = Factory.getOne(Post)

exports.createPost = Factory.createOne(Post)

exports.updatePost = Factory.updateOne(Post)

exports.deletePost = Factory.deleteOne(Post)
