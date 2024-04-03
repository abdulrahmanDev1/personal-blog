const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: [true, 'A comment must have a body'],
      trim: true,
      maxlength: [200, 'A comment must have less or equal then 200 characters'],
      minlength: [10, 'A comment must have more or equal then 10 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: [true, 'A comment must belong to a post']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
      // required: [true, 'A comment must belong to a user']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

commentSchema.post('save', async function (doc) {
  const Post = mongoose.model('Post')
  await Post.findByIdAndUpdate(doc.post, {
    $push: { comments: doc._id },
    $inc: { commentsCount: 1 }
  })
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
