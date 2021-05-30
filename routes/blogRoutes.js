const {Router}  =   require('express');
const router = Router();
const blogController=require('../controller/blogController')

router.get('/blogs',(req,res)=>{
    res.render('blog-reg')
});
router.post('/blogs',blogController.postblogs);
router.get('/blogs2',blogController.get_blogs2);
router.get('/blogs/:id',blogController.edit_blog);
module.exports = router;