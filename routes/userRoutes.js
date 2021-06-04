
const {Router}  =   require('express');
const router = Router();
const userController =  require('../controller/userController')

router.post('/login',userController.post_login);
router.get('/login',userController.get_login);
router.get('/register',userController.get_register);
router.post('/register',userController.post_register);
router.get('/userview',userController.displayUserView);
router.post('/addjob',userController.postjob);
router.get('/wait',userController.getwait);


//upto this almost secured



router.get('/jobs/:id',userController.edit_job);

router.post('/jobss/:id',userController.postedit_job);


router.post('/forgotpassword',userController.post_forgotpassword)
router.get('/forgotpassword',userController.get_forgotpassword)


router.get('/delete',userController.deletecuser);
router.get('/addblog',userController.addblogs);


module.exports = router;