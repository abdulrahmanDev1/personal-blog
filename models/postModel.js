const mongoose = require('mongoose')
const slugify = require('slugify')

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A post must have a title'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'A post title must have less or equal then 40 characters'
      ],
      minlength: [5, 'A post title must have more or equal then 5 characters']
    },
    body: {
      type: String,
      required: [true, 'A post must have a body'],
      trim: true,
      maxlength: [
        200,
        'A post body must have less or equal then 200 characters'
      ],
      minlength: [10, 'A post body must have more or equal then 10 characters']
    },
    images: {
      type: [String]
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    category: {
      required: [true, 'A post must have a category'],
      type: mongoose.Schema.ObjectId,
      ref: 'Category'
    },
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
      }
    ],
    commentsCount: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    slug: String
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

postSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true })
  next()
})

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: '-posts -__v  -postsCount'
  })

  this.populate({
    path: 'comments',
    select: '-post -__v -user'
  })

  next()
})

postSchema.pre('save', async function (next) {
  if (this.isModified('body', 'title', 'category', 'images')) {
    this.updatedAt = Date.now()
  }
  next()
})

postSchema.post('save', async function (doc) {
  const Category = mongoose.model('Category')
  try {
    await Category.findByIdAndUpdate(doc.category, {
      $inc: { postsCount: 1 }
    })
  } catch (error) {
    console.error(error)
  }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
