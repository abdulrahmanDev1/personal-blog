const router = require('express').Router()
const postController = require('../controllers/postController')
const commentRouter = require('./commentRoutes')

router.use('/:postId/comments', commentRouter)

router.get('/', postController.getAllPosts)

router.post('/', postController.checkBody, postController.createPost)

router
  .route('/:id')
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost)

module.exports = router
