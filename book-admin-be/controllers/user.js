

const userModel = require('../models/user')
//注册
const signup = async (req, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8')

    //从前端获取username，password
    let { username, password } = req.body

    //根据用户名，查找用户是否注册过
    let isSigned = !!(await userModel.findone({
        username
    }))

    if (isSigned) {
        res.render('user', {
            ret: true,
            data: JSON.stringify({
                msg: '用户名已存在'
            })
        })

    } else {
        let result = await userModel.signup({
            username,
            password
        })
        if (!!result) {
            res.render('user', {
                ret: true,
                data: JSON.stringify({
                    msg: '用户注册成功'
                })
            })
        }
    }
}

//登录
const signin = async (req, res, next) => {

    res.header('Content-Type', 'application/json; charset=utf-8')
    //从前端获取username，password
    let { username, password } = req.body
    //根据用户名，查找用户
    let result = await userModel.findone({
        username
    })
    if (!!result) {
        if (password === result.password) {
            // 采用express-session模块：
            // 用来在服务器端产生一个SessionID: ID可以存在数据库里，默认保存在内存里
            // 同时会给浏览器种一个cookie(res.setCookie), cookie的内容是SessionID
            // 这个操作需要在app.js里做session的初始化配置，配置后，req.session对象就有了
            req.session.username = username

            res.render('textbook', {
                ret: true,
                data: JSON.stringify({
                    username
                })
            })
        } else {
            res.render('user', {
                ret: false,
                data: JSON.stringify({
                    msg: '密码错误'
                })
            })
        }
    } else {
        res.render('user', {
            ret: false,
            data: JSON.stringify({
                msg: '该用户尚未注册'
            })
        })
    }
}


//判断用户是否登录
const isSignin = (req, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    let username = req.session.username
    if (!!username) {
        res.render('user', {
            ret: true,
            data: JSON.stringify({
                username
            })
        })
    } else {
        res.render('user', {
            ret: false,
            data: JSON.stringify({
                msg: '没有权限'
            })
        })
    }
}

//用户登出
const signout = (req, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    req.session.username = null
    res.render('user', {
        ret: true,
        data: JSON.stringify({
            msg: '退出成功~'
        })
    })
}

module.exports = {
    signup,
    signin,
    isSignin,
    signout
}
