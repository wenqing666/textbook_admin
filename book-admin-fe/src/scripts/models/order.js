const listall = () => {
    return $.ajax({
        url: '/api/textbook/list',
        success: (result) => {
            return result
        }
    })
}

const save = (data) => {
    return $.ajax({
        url: '/api/order/save',
        type: 'POST',
        data,
        success: (result) => {
            return result
        }
    })
}


module.exports = {
    listall,
    save
}