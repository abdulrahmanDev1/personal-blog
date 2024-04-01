const mongoose = require('mongoose');
const env = require('dotenv');
env.config({ path: './.env' });

mongoose
  .connect(
    process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)
  )
  .then(() => console.log('DB Connected!'))
  .catch((err) => console.log(err));
