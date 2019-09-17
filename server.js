const express = require("express")
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express()
require('./models/User')
const passport = require('passport')

// passport 初始化
app.use(passport.initialize())
require("./config/passport")(passport) //使用passport

//使用body-parser中间件(处理post)
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
//引入user.js
const users = require("./routes/api/users")
const profiles = require("./routes/api/profiles")

//使用users
app.use("/api/users", users)
app.use("/api/profiles", profiles)


// DB config
const db = require('./config/keys').mongoURI;

// Connect to mongodb
mongoose
  .connect(
    db, {
      useNewUrlParser: true
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})