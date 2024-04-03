const Category = require('../models/categoryModel')
const Factory = require('./Factory')

exports.checkBody = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Category name is required'
    })
  }
  next()
}

exports.getAllCategories = Factory.getAll(Category)

exports.getCategory = Factory.getOne(Category)

exports.createCategory = Factory.createOne(Category)

exports.updateCategory = Factory.updateOne(Category)

exports.deleteCategory = Factory.deleteOne(Category)
