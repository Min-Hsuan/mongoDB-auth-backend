const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const dbConnent = require('./db/dbConnect')
const bcrypt = require('bcrypt')
const User = require('./db/userModel')


// execute database connection
dbConnent()
// body parser configuration
app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

app.post('/register',async(req,res)=>{
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    // create a new user instance and collect the data
    const user = new User({
      email: req.body.email,
      password: hashedPassword
    })
    //save the new user
    try{
      const result = user.save()
      res.status(201).send({
        message: 'User Created Successfully',
        result
      })
    }catch(error){
      this.response.status(500).send({
        message:'Error Creating user',
        error
      })
    }
  }catch(error){
    res.status(500).send({
      message: 'Password was not hashed successfully',
      error
    })
  }
})

module.exports = app;
