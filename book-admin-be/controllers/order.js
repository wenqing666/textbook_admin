const orderModel = require('../models/order')
const moment = require('moment')
//显示全部数据
const listall = async (req, res, next) => {
    res.header('Content-Type', 'application/json;charset=utf-8')
    //把.ejs模板读出来，内容交给前端
    let data = JSON.stringify(await orderModel.listall())
    if (!!data) {
        res.render('order', {
            ret: true,
            data
        })

    } else {
        res.render('order', {
            ret: false,
            data: JSON.stringify({
                msg: '获取数据失败，请和管理员联系'
            })
        })
    }
}

//保存数据
const save = async (req, res, next) => {
    res.header('Content-Type', 'application/json;charset=utf-8')

    let result = await orderModel.save({
        ...req.body,
        createDate: moment().format('YYYY-MM-DD HH:mm')
    })

    if (!!result) {
        res.render('order', {
            ret: true,
            data: JSON.stringify({
                msg: '数据保存成功'
            })
        })
    } else {
        res.render('order', {
            ret: false,
            data: JSON.stringify({
                msg: '数据保存失败'
            })
        })
    }
}

module.exports = {
    listall,
    save
}