const express = require("express")
const router = express.Router()
const HomeController = require('../controllers/HomeController')
const UserController = require("../controllers/UserController")


router.get('/', HomeController.index)
router.get('/users' ,UserController.findUsers)
router.get('/user/:id', UserController.findId)
router.post('/register', UserController.create)
router.post('/login', UserController.login)
router.post('/verify', UserController.verify)

module.exports = router