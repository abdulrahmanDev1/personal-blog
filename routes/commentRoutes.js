const router = require('express').Router()
const commentController = require('../controllers/commentController')

router.get('/', commentController.getAllComments)
router.post('/', commentController.checkBody, commentController.createComment)

router
  .route('/:id')
  .get(commentController.getComment)
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment)

module.exports = router
