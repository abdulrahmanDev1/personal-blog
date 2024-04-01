const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A category must have a name'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'A category name must have less or equal then 40 characters'
      ],
      minlength: [
        3,
        'A category name must have more or equal then 5 characters'
      ]
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    postsCount: {
      type: Number,
      default: 0
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

categorySchema.virtual('posts', {
  ref: 'Post',
  foreignField: 'category',
  localField: '_id'
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
