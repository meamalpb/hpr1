const {Router}  =   require('express');
const router = Router();

router.get('/blogs',(req,res)=>{
    res.render('blog')
})

module.exports = router;