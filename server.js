const app = require('./app')
require('./utils/DB')

const port = process.env.PORT || 3000
app.listen(port, () => {
  if (process.env.NODE_ENV === 'development') {
    const url = `http://localhost:${port}`
    console.log(`Connected on ${url}`)
  }
})
