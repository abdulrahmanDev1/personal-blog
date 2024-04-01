const router = require('express').Router()

const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.getAllCategories)

router
  .route('/:id')
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory)

router.post(
  '/',
  categoryController.checkBody,
  categoryController.createCategory
)

module.exports = router
