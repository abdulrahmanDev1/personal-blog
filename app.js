const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

const AppError = require('./utils/appError.js')
const globalErrorHandler = require('./controllers/errorController')
const postRouter = require('./routes/postRoutes')
const categoryRouter = require('./routes/categoryRoutes')
const commentRouter = require('./routes/commentRoutes')
const userRouter = require('./routes/userRoutes')

const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')

dotenv.config({ path: './.env' })

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000
})

app.use('/api', limiter)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(mongoSanitize())

app.use('/api/v1/posts', postRouter)
app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/comments', commentRouter)
app.use('/api/v1/users', userRouter)

app.use((req, res, next) => {
  console.log(req.user)
  next()
})

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})
app.use(globalErrorHandler)

module.exports = app
