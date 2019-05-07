const express = require('express')
const orderController = require('../controllers/order')

const router = express.Router()

//注意，listall不要调用
router.get('/listall', orderController.listall)
router.post('/save', orderController.save)

module.exports = router