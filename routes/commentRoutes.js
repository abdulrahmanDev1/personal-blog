const router = require('express').Router({ mergeParams: true })
const commentController = require('../controllers/commentController')
const { protect } = require('../controllers/authController')

router.use(protect)

router.get('/', commentController.getAllComments)
router.post(
  '/',
  commentController.checkBody,
  commentController.setPostId,
  commentController.createComment
)

router
  .route('/:id')
  .get(commentController.getComment)
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment)

module.exports = router
