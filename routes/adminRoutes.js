const {Router}  =   require('express');
const router = Router();
const adminController = require('../controller/adminController')

router.get('/admin-login',adminController.get_admin_login);
router.post('/admin-login',adminController.post_admin_login);
router.get('/blogs',adminController.get_blogs2);
router.get('/requests',adminController.get_admin_user_request);
router.get('/requests/:id',adminController.activateUser);
router.get('/requests2/:id',adminController.rejectUser);
router.post('/changeusertype',adminController.changeusertype);
router.get('/otp',adminController.checkotp);



module.exports = router;
