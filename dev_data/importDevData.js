const mongoose = require('mongoose')
const Category = require('../models/categoryModel')
const Post = require('../models/postModel')
const Comment = require('../models/commentModel')
const env = require('dotenv')

env.config({ path: '../.env' })

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)
    )
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

const deleteAllData = async () => {
  try {
    await Category.deleteMany()
    await Post.deleteMany()
    await Comment.deleteMany()
    console.log('All data deleted from the database')
  } catch (error) {
    console.error('Error deleting data:', error)
    process.exit(1)
  }
}

const fs = require('fs')

const insertDevData = async () => {
  try {
    // Read the JSON file containing the dev data
    const jsonData = fs.readFileSync('data.json', 'utf8')
    const devData = JSON.parse(jsonData)

    // Check if there are any categories in the database
    const existingCategories = await Category.find()
    if (existingCategories.length === 0) {
      // If no categories in the database, add categories from the JSON file
      await Category.create(devData.categories)
      console.log('Categories added to the database.')
    }

    // Fetch categories from the database and store their IDs
    const categories = await Category.find()
    const categoryMap = new Map(
      categories.map((category) => [category.name, category._id])
    )

    // Update dev data with category IDs
    const updatedPosts = devData.posts.map((post) => ({
      ...post,
      category: categoryMap.get(post.category)
    }))

    // Create posts using updated data
    await Post.create(updatedPosts)

    // Fetch posts from the database and store their IDs
    const posts = await Post.find()
    const postMap = new Map(posts.map((post) => [post.title, post._id]))

    // Update dev data with post IDs
    const updatedComments = devData.comments.map((comment) => ({
      ...comment,
      post: postMap.get(comment.post)
    }))

    // Create comments using updated data
    await Comment.create(updatedComments)

    console.log('Development data inserted successfully.')
  } catch (error) {
    console.error('Error inserting development data:', error)
    process.exit(1)
  }
}

const main = async () => {
  await connectToDatabase()

  const arg = process.argv[2]
  if (arg === '--delete') {
    await deleteAllData()
  } else if (arg === '--import') {
    await insertDevData()
  } else {
    console.error('Invalid argument. Use --delete or --import')
    process.exit(1)
  }

  await mongoose.disconnect()
  console.log('Disconnected from MongoDB')
}

main()
