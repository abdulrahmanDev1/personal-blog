const Post = require('../models/postModel')
const catchAsync = require('../utils/catchAsync')

const checkPost = (req, res, post) => {
  if (!post) {
    return res.status(404).json({
      status: 'fail',
      message: 'No post found with that ID'
    })
  }
  return post
}

exports.checkBody = (req, res, next) => {
  if (!req.body.title || !req.body.body) {
    return res.status(400).json({
      status: 'fail',
      message: 'title and body are required'
    })
  }
  next()
}

exports.getAllPosts = catchAsync(async (req, res) => {
  const posts = await Post.find()

  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      posts
    }
  })
})

exports.getPost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.id)

  checkPost(req, res, post)

  res.status(200).json({
    status: 'success',
    data: {
      post
    }
  })
})

exports.createPost = catchAsync(async (req, res) => {
  const newPost = await Post.create(req.body)

  res.status(201).json({
    status: 'success',
    data: {
      post: newPost
    }
  })
})

exports.updatePost = catchAsync(async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  checkPost(req, res, post)

  res.status(200).json({
    status: 'success',
    data: {
      post
    }
  })
})

exports.deletePost = catchAsync(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id)

  checkPost(req, res, post)

  console.log('Post deleted')
  res.status(204).json({
    status: 'success',
    data: null
  })
})
