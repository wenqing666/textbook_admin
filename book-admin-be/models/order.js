const mongoose = require('../utils/database')

//创建Schema，创建集合
const orderSchema = new mongoose.Schema({
    subscriber: String,
    orderNumber: Number,
    createDate: String
});

//集合名，集合结构
const OrderModel = mongoose.model('orders', orderSchema)

//保存一条信息
const save = (data) => {
    return new OrderModel(data)
        .save()
        .then((result) => {
            return result
        })
}

//取到全部订购教材信息
const listall = () => {
    return OrderModel
        .find({})
        .sort({ _id: -1 })
        .then((result) => {
            return result
        })
        //catch表示find操作出错，空数据并不代表出错
        .catch((err) => {
            return false
        })
}
module.exports = {
    listall,
    save
}