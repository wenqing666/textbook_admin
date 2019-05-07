import adminListTpl from '../views/admin.list.html'
import adminModel from '../models/admin'

const listall = async ({
    router,
    res
}) => {
    let html = template.render(adminListTpl, {
        data: (await adminModel.listall()).data
    })

    res.render(html)
}

export default {
    listall
}