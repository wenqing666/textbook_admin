const express = require('express')

const textbookController = require('../controllers/textbook')

const fileUploadMiddleWare = require('../middlewares/fileupload')
const userAuthMiddleware = require('../middlewares/userauth')

const router = express.Router()

// list 负责返回某一个页数据，同时会把total(positions集合文档的总数)返回
router.get('/list', userAuthMiddleware.auth, textbookController.list)
// listall 返回 total(positions集合文档的总数)，为了提高性能，没有返回职位数据
router.get('/listall', textbookController.listall)

router.post('/save', textbookController.save)
router.delete('/remove', textbookController.remove)
router.post('/update', textbookController.update)
router.post('/listone', textbookController.listone)

module.exports = router