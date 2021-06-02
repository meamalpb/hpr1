const {Router}  =   require('express');
const router = Router();
const internalController = require('../controller/internalController')



router.get('/internalviews',internalController.get_internal_views);

module.exports = router;
