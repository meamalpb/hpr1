const firebase = require('firebase');



module.exports.postblogs=async(req,res)=>{
    console.log(req.body)
    firebase.firestore().collection('riz_blogs').add({title:req.body.title,content:req.body.content}).then((res)=>{console.log(res)})
}

module.exports.get_blog = (req,res) => {
    res.render('blog');
}

