const {Router}  =   require('express');
const router = Router();
const adminController = require('../controller/adminController')

router.get('/admin-login',adminController.get_admin_login);
router.post('/admin-login',adminController.post_admin_login);
router.get('/blogs',adminController.get_blogs2);

module.exports = router;
