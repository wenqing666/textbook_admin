const adminModel = require('../models/admin')

//显示全部数据
const listall = async (req, res, next) => {
    res.header('Content-Type', 'application/json;charset=utf-8')
    //把.ejs模板读出来，内容交给前端
    let data = JSON.stringify(await adminModel.listall())
    if (data) {
        res.render('admin', {
            ret: true,
            data
        })

    } else {
        res.render('admin', {
            ret: false,
            data: JSON.stringify({
                msg: '获取数据失败，请和管理员联系'
            })
        })
    }
}

module.exports = {
    listall
}