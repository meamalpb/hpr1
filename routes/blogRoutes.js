const {Router}  =   require('express');
const router = Router();
const blogController=require('../controller/blogController')

router.get('/blogs',blogController.get_blog);

module.exports = router;