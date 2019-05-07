import orderListTpl from '../views/order.list.html'
import orderSaveTpl from '../views/order.save.html'
import orderModel from '../models/order'

const _bindListEvents = (router) => {
    //给订购按钮绑定事件
    $('#order').on('click', () => {
        router.go('/order_save')
    })
}

const _bindSaveEvents = (router) => {
    //给取消按钮添加绑定事件
    $('#posback').on('click', () => {
        router.back()
    })

    // //给确定按钮添加绑定事件
    $('#possubmit').on('click', async () => {
        //获取表单输入的内容
        let data = $('#possave').serialize()
        let result = await orderModel.save(data)
        console.log(result)
        if (result.ret) {
            router.go('/admin')
        } else {
            alert(result.data.msg)
        }
    })
}


const listall = async ({ router, res }) => {
    let html = template.render(orderListTpl, {
        data: (await orderModel.listall()).data
    })
    res.render(html)
    _bindListEvents(router)
}

const save = ({ router, res }) => {
    res.render(orderSaveTpl)
    _bindSaveEvents(router)
}


export default {
    listall,
    save
}