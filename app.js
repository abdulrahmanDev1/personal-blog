const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const AppError = require('./utils/appError.js')
const globalErrorHandler = require('./controllers/errorController')
const postRouter = require('./routes/postRoutes')
const categoryRouter = require('./routes/categoryRoutes')
const commentRouter = require('./routes/commentRoutes')
const morgan = require('morgan')
const dotenv = require('dotenv')

const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')

dotenv.config({ path: './.env' })

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})

app.use(limiter)
app.use(mongoSanitize())

app.use('/api/v1/posts', postRouter)
app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/comments', commentRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})
app.use(globalErrorHandler)

module.exports = app
