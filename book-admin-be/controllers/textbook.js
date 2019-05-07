const textbookModel = require('../models/textbook')


//显示全部数据
const list = async (req, res, next) => {
    res.header('Content-Type', 'application/json;charset=utf-8')
    //把.ejs模板读出来，内容交给前端
    let {
        pageNo = 1,
        pageSize = 10,
        keywords = ''
    } = req.query

    let list = await textbookModel.list({
        start: (~~pageNo - 1) * ~~pageSize,
        count: ~~pageSize,
        keywords
    })

    if (list) {
        res.render('textbook', {
            ret: true,
            data: JSON.stringify({
                list,
                total: (await textbookModel.listall({
                    keywords
                })).length
            })
        })
    } else {
        res.render('textbook', {
            ret: false,
            data: JSON.stringify({
                msg: '获取数据失败，请和管理员联系'
            })
        })
    }
}

// 获取全部信息
const listall = async (req, res, next) => {
    res.header('Content-Type', 'application/json;charset=utf-8')
    let { keywords } = req.query
    let listall = await textbookModel.listall({
        keywords
    })
    if (listall) {
        res.render('textbook', {
            ret: true,
            data: JSON.stringify({
                //list,
                total: listall.length
            })
        })
    }
}

//显示单条数据
const listone = async (req, res, next) => {
    let id = req.body.id
    res.header('Content-Type', 'application/json;charset=utf-8')
    let data = JSON.stringify(await textbookModel.listone(id))
    if (data) {
        res.render('textbook', {
            ret: true,
            data
        })
    }
}

//保存数据
const save = async (req, res, next) => {
    res.header('Content-Type', 'application/json;charset=utf-8')

    let result = await textbookModel.save({
        ...req.body
    })


    if (!!result) {
        res.render('textbook', {
            ret: true,
            data: JSON.stringify({
                msg: '数据保存成功'
            })
        })
    } else {
        res.render('textbook', {
            ret: false,
            data: JSON.stringify({
                msg: '数据保存失败'
            })
        })
    }
}

//删除
const remove = async (req, res, next) => {
    res.header('Content-Type', 'application/json;charset=utf-8')

    let {
        id
    } = req.body

    let result = await textbookModel.remove(id)

    if (!!result) {
        res.render('textbook', {
            ret: true,
            data: JSON.stringify({
                msg: '删除成功~'
            })
        })
    }
}

//修改
const update = async (req, res, next) => {
    res.header('Content-Type', 'application/json;charset=utf-8')
    let result = await textbookModel.update({
        id: req.body.id,
        data: {
            ...req.body
        }
    })

    if (!!result) {
        res.render('textbook', {
            ret: true,
            data: JSON.stringify({
                msg: '修改成功~'
            })
        })
    }
}



module.exports = {
    list,
    listall,
    listone,
    save,
    remove,
    update
}