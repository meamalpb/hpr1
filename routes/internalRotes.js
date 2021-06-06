const {Router}  =   require('express');
const router = Router();
const internalController = require('../controller/internalController')



router.get('/internalviews',internalController.get_internal_views);
router.get('/internallogin',internalController.get_internal_login)
router.get('/internalregister',internalController.get_internal_register)

module.exports = router;
