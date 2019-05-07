const listall = () => {
    return $.ajax({
        url: '/api/order/listall',
        success: (result) => {
            return result
        }
    })
}

module.exports = {
    listall
}