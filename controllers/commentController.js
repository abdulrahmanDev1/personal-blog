const Comment = require('../models/commentModel')
const catchAsync = require('../utils/catchAsync')

const checkComment = (req, res, comment) => {
  if (!comment) {
    return res.status(404).json({
      status: 'fail',
      message: 'No comment found with that ID'
    })
  }
  return comment
}

exports.checkBody = (req, res, next) => {
  if (!req.body.body) {
    return res.status(400).json({
      status: 'fail',
      message: 'Comment body is required'
    })
  }
  next()
}

exports.getAllComments = catchAsync(async (req, res) => {
  const comments = await Comment.find()

  res.status(200).json({
    status: 'success',
    results: comments.length,
    data: {
      comments
    }
  })
})

exports.getComment = catchAsync(async (req, res) => {
  const comment = await Comment.findById(req.params.id)

  checkComment(req, res, comment)

  res.status(200).json({
    status: 'success',
    data: {
      comment
    }
  })
})

exports.createComment = catchAsync(async (req, res) => {
  const newComment = await Comment.create(req.body)

  res.status(201).json({
    status: 'success',
    data: {
      comment: newComment
    }
  })
})

exports.updateComment = catchAsync(async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  checkComment(req, res, comment)

  res.status(200).json({
    status: 'success',
    data: {
      comment
    }
  })
})

exports.deleteComment = catchAsync(async (req, res) => {
  const comment = await Comment.findByIdAndDelete(req.params.id)

  checkComment(req, res, comment)

  console.log('Comment deleted')
  res.status(204).json({
    status: 'success',
    data: null
  })
})
