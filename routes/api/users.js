const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')

const User = require("../../models/User")

// $route GET api/users/test
// @desc 返回的请求的json数据
// @access public

router.get('/test', (req, res) => {
    res.json({
        msg: 'login works'
    })
});

// $route POST api/users/register
// @desc 返回的请求的json数据
// @access public
router.post("/register", (req, res) => {
    console.log(req.body)
    User.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (user) {
                return res.status(400).json({
                    email: "邮箱已被注册!"
                })
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                })
                const newUser = User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avatar
                })
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err
                        newUser.password = hash

                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
})

// $route POST api/users/login
// @desc 返回token jwt passport
// @access public

router.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({
            email
        })
        .then(user => {
            if (!user) {
                return res.status(404).json("用户不存在")
            }
            //密码匹配
            bcrypt.compare(password, user.password)
            .then(isMatch=>{
                if (isMatch) {
                    jwt.sign("规则","加密名字","过期时间","箭头函数")
                    res.json({msg:"密码匹配"})
                } else{
                    return res.status(400).json({password:"密码不匹配"})
                }
            })

        })
})
module.exports = router