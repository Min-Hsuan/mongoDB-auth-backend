const mongoose = require('mongoose')
require('dotenv').config()

async function dbConnent(){
  mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(()=>console.log('Successfully connected to MongoDB Atlas!')).catch(error=>console.error(error))
}
module.exports = dbConnent