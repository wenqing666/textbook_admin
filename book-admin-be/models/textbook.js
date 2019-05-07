const mongoose = require('../utils/database')

//创建Schema，创建集合
const textbookSchema = new mongoose.Schema({
    bookName: String,
    press: String,
    author: String,
    isbn: String,
    price: String

})
const TextbookModel = mongoose.model('textbooks', textbookSchema)

//保存一条信息
const save = (data) => {
    return new TextbookModel(data)
        .save()
        .then((result) => {
            return result
        })
}

//取到单页教材信息
const list = ({
    start,
    count,
    keywords
}) => {
    let reg = new RegExp(keywords, 'gi')
    return TextbookModel
        //关键字模糊查询
        .find({
            $or: [
                {
                    'textbookName': reg
                },
                {
                    'press': reg
                }
            ]
        })
        .sort({
            _id: -1
        })
        .skip(start)
        .limit(count)
        .then((result) => {
            return result
        })
        //catch表示find操作出错，空数据并不代表出错
        .catch((err) => {
            return false
        })
}

//获取全部教材信息
const listall = ({ keywords }) => {
    let reg = new RegExp(keywords, 'gi')
    return TextbookModel
        .find({
            $or: [
                {
                    'textbookName': reg
                },
                {
                    'press': reg
                }
            ]
        })
        .sort({
            _id: -1
        })
        .then((result) => {
            return result
        })
        //catch表示find操作出错，空数据并不代表出错
        .catch((err) => {
            return false
        })
}

//显示单条信息
const listone = (id) => {
    return TextbookModel
        .findById(id)
        .then((result) => {
            return result
        })
}

//删除教材信息
const remove = (id) => {
    return TextbookModel
        .findByIdAndDelete(id)
        .then((result) => {
            return result
        })
}

//修改教材信息
const update = async ({
    id,
    data
}) => {
    return TextbookModel
        .findByIdAndUpdate(id, data)
        .then((result) => {
            return result
        })
}

module.exports = {
    list,
    listall,
    listone,
    save,
    remove,
    update
}