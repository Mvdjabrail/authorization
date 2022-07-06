const {Router} = require('express') 
const {userController} = require('../controllers/user.controller')

const router = Router()

router.get('/user', userController.getUser)
router.post('/user', userController.postUser)
router.post('/login', userController.login)

module.exports = router;