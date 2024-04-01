const Category = require('../models/categoryModel')
const catchAsync = require('../utils/catchAsync')

const checkCategory = (req, res, category) => {
  if (!category) {
    return res.status(404).json({
      status: 'fail',
      message: 'No category found with that ID'
    })
  }
  return category
}

exports.checkBody = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
      status: 'fail',
      message: 'name is required'
    })
  }
  next()
}

exports.getAllCategories = catchAsync(async (req, res) => {
  const Categories = await Category.find()

  res.status(200).json({
    status: 'success',
    results: Categories.length,
    data: {
      Categories
    }
  })
})

exports.getCategory = catchAsync(async (req, res) => {
  const category = await Category.findById(req.params.id)

  checkCategory(req, res, category)

  res.status(200).json({
    status: 'success',
    data: {
      category
    }
  })
})

exports.createCategory = catchAsync(async (req, res) => {
  const newCategory = await Category.create(req.body)

  res.status(201).json({
    status: 'success',
    data: {
      category: newCategory
    }
  })
})

exports.updateCategory = catchAsync(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  checkCategory(req, res, category)

  res.status(200).json({
    status: 'success',
    data: {
      category
    }
  })
})

exports.deleteCategory = catchAsync(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id)

  checkCategory(req, res, category)

  console.log('category deleted')
  res.status(204).json({
    status: 'success',
    data: null
  })
})
