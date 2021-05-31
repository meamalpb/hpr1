const {Router}  =   require('express');
const router = Router();
const authController =  require('../controller/authController')

//the function which is to happen after going to authroute is in authcontroller file 
router.post('/login',authController.post_login);
router.get('/login',authController.get_login);
router.get('/register',authController.get_register);
router.post('/register',authController.post_register);


router.get('/costumer-reg',(req,res)   =>  {
    res.render('costumer-reg')
});


router.get('/register',(req,res)   =>  {
    res.render('register')
});


//admin only routes
router.get('/admin-login',authController.get_admin_login);
router.get('/admin-view',authController.get_admin_view)
router.post('/admin-login',authController.post_admin_login)

module.exports = router;