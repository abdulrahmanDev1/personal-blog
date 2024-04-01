const router = require('express').Router({ mergeParams: true })
const postController = require('../controllers/postController')
const commentRouter = require('./commentRoutes')

router.use('/:postId/comments', commentRouter)

router.get('/', postController.getAllPosts)

router
  .route('/:id')
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost)

router.post('/', postController.checkBody, postController.createPost)

module.exports = router
