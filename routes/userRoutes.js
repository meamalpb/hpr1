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
router.post('/blogs/:id',userController.postedit_blog);
router.post('/forgotpassword',userController.post_forgotpassword)
router.get('/forgotpassword',userController.get_forgotpassword)
router.get('/userview',userController.displayUserView);

router.get('/delete',userController.deletecuser);

module.exports = router;