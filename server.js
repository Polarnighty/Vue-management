const express = require("express")
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express()
const port = process.env.port || 5000

//使用body-parser中间件(处理post)
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//引入user.js
const users = require("./routes/api/users")

//使用users
app.use("/api/users",users)

// DB config
const db = require('./config/keys').mongoURI;

// Connect to mongodb
mongoose
  .connect(
    db,
    {  useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log('Server running on port ${port}')
})