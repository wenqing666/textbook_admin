import textbookListTpl from '../views/textbook.list.html'
import textbookSaveTpl from '../views/textbook.save.html'
import textbookUpdateTpl from '../views/textbook.update.html'
import textbookModel from '../models/textbook'

const _genToken = () => {
    return new Date().getTime() + Math.random()
}

const _bindListEvents = ({
    router,
    req,
    pageSize
}) => {
    //给添加按钮绑定事件
    $('#addbtn').on('click', () => {
        router.go('/textbook_save')
    })

    //给删除按钮绑定事件
    $('.pos-remove').on('click', function () {
        let that = this
        _removeTextbook({
            that,
            router,
            req,
            pageSize
        })
    })

    //给修改按钮绑定事件
    $('.pos-update').on('click', function () {
        let id = $(this).attr('posid')
        router.go('/textbook_update', {
            id
        })
    })

    //给搜索按钮绑定事件
    $('#possearch').on('click', function () {
        let keywords = $('#keywords').val()
        let query = {
            ...req.query,
            pageNo: 1,
            keywords,
            _: _genToken()
        }
        router.go(`/textbook?${$.param(query)}`)
    })
}

const _removeTextbook = async ({
    that,
    router,
    req,
    pageSize
}) => {
    //获取点击对象的id值
    let id = $(that).attr('posid')
    let result = await textbookModel.remove(id)
    if (result.ret) {
        let { keywords = '', pageNo } = req.query || { pageNo: 1 }
        //1、去后端取最鲜活的total, 根据total 计算最鲜活的 pageCount
        let total = (await textbookModel.listall({ keywords })).data.total
        //2、计算鲜活的pageCount
        let pageCount = Math.ceil(total / ~~pageSize)
        //3、判断pageCount 和 pageNo关系
        // 如果 pageNo > pageCount, 表明是在最后一页，且已经删光了
        if (pageNo > pageCount && pageNo != 1) {
            pageNo = pageNo - 1
        }
        //给路由加ID来实现新的路由的跳转
        router.go(`/textbook?_=${id}&pageNo=${pageNo}&keywords=${keywords || ''}`)
    } else {
        alert('删除失败')
    }
}

const _bindSaveEvents = (router) => {
    //给返回按钮添加绑定事件
    $('#posback').on('click', () => {
        router.back()
    })

    //给添加按钮添加绑定事件
    $('#possubmit').on('click', async () => {
        let result = await textbookModel.save()
        if (result.ret) {
            router.back()
            //清空表单
            //$('#possave').get(0).reset()
        } else {
            alert(result.data.msg)
        }
    })
}

const _bindUpdateEvents = (router) => {
    //给返回按钮添加绑定事件
    $('#posback').on('click', () => {
        router.back()
    })

    //给提交按钮添加绑定事件
    $('#possubmit').on('click', async () => {
        let result = await textbookModel.update()
        if (result.ret) {
            router.back()
        } else {
            alert(result.data.msg)
        }
    })
}

const list = async ({
    router,
    res,
    req
}) => {
    let result = (await textbookModel.list({
        pageNo,
        pageSize,
        keywords
    }))

    //用户是否登录
    if (!result.ret) {
        router.go('/home')
        return
    } else {
        var { list, total } = result.data
    }

    let {
        pageNo = 1,
        pageSize = 10,
        keywords = ''
    } = req.query || {}

    let pageCount = Math.ceil(total / ~~pageSize)
    let html = template.render(textbookListTpl, {
        list, // 列表数据源
        pageArray: new Array(pageCount), // 构造分页页码数组
        pageNo: ~~pageNo, // 当前页
        pageCount: ~~pageCount, // 总页数
        pageSize: ~~pageSize, // 每页条数
        keywords //关键字
    })

    res.render(html)

    //添加，修改，删除按钮的事件绑定
    _bindListEvents({
        router,
        req,
        pageSize
    })
}

const save = ({
    router,
    res
}) => {
    res.render(textbookSaveTpl)

    _bindSaveEvents(router)
}

// 渲染修改页面
const update = async ({
    router,
    req,
    res
}) => {
    let id = req.body.id

    let html = template.render(textbookUpdateTpl, {
        data: (await textbookModel.listone(id)).data
    })
    res.render(html)

    _bindUpdateEvents(router)
}

export default {
    list,
    save,
    update
}
