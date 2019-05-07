const express = require('express')
const adminController = require('../controllers/admin')

const router = express.Router()

//注意，listall不要调用
router.get('/listall', adminController.listall)

module.exports = router