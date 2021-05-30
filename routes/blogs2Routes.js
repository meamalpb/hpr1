const {Router}  =   require('express');
const router = Router();
const blogs2Controller =  require('../controller/blogs2Controller')
router.get('/blogs2',blogs2Controller.get_blogs2);
module.exports = router;