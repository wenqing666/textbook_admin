import SMERouter from 'sme-router'

//装载模板
import homeTpl from '../views/home.html'
import textbookController from '../controllers/textbook'
import orderController from '../controllers/order'
import adminController from '../controllers/admin'

//路由定义
var router = null
const _render = () => {
    router = new SMERouter('router-view')

    //首页
    router.route('/home', (req, res, next) => {
        res.render(homeTpl)
    })

    //教材订购
    router.route('/order', (req, res, next) => {
        orderController.listall({
            router,
            req,
            res,
            next
        })
    })

    //教材订购 - 订购
    router.route('/order_save', (req, res, next) => {
        orderController.save({
            router,
            req,
            res,
            next
        })
    })

    //订单管理
    router.route('/admin', (req, res, next) => {
        adminController.listall({
            router,
            req,
            res,
            next
        })
    })

    //信息管理 -列表
    router.route('/textbook', (req, res, next) => {
        textbookController.list({
            router,
            req,
            res,
            next
        })
    })

    //信息管理 -添加
    router.route('/textbook_save', (req, res, next) => {
        textbookController.save({
            router,
            req,
            res,
            next
        })
    })

    //信息管理-修改
    router.route('/textbook_update', (req, res, next) => {
        textbookController.update({
            router,
            req,
            res,
            next
        })
    })

    //通用路由
    router.route('*', (req, res, next) => {
        //当路由不匹配时
        res.redirect('/home')
    })

    //第一次渲染页面时，需要将路由导航到 /home
    // router.go('/home')

    //中间件定义，路由切换时调用
    //用来实现导航高亮
    router.use((req) => {
        _activeLink(req.route)
    })
}

//路由导航
const _navLink = () => {
    let $lis = $('#sidebar-menu li[to]')
    $lis.on('click', function () {
        let to = $(this).attr('to')
        router.go(to)
    })
}

//导航高亮
const _activeLink = (route) => {
    let $lis = $('#sidebar-menu li[to]')
    $lis
        .filter(`[to="${route}"]`)
        .addClass('active')
        .siblings()
        .removeClass('active')
}

export default {
    render: _render,
    navLink: _navLink
}