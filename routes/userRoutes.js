const {Router}  =   require('express');
const router = Router();
const authController =  require('../controller/userController')

router.post('/login',authController.post_login);
router.get('/login',authController.get_login);
router.get('/register',authController.get_register);
router.post('/register',authController.post_register);


router.get('/addblog',authController.addblogs);
router.post('/addblog',authController.postblogs);
router.get('/blogs/:id',authController.edit_blog);


module.exports = router;