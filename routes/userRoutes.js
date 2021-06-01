const {Router}  =   require('express');
const router = Router();
const userController =  require('../controller/userController')

router.post('/login',userController.post_login);
router.get('/login',userController.get_login);
router.get('/register',userController.get_register);
router.post('/register',userController.post_register);


router.get('/addblog',userController.addblogs);
router.post('/addblog',userController.postblogs);
router.get('/blogs/:id',userController.edit_blog);
router.get('/wait',userController.getwait);

module.exports = router;