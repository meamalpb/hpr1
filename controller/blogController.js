const firebase = require('firebase');



module.exports.postblogs=async(req,res)=>{
    console.log(req.body)
    firebase.firestore().collection('riz_blogs').add({title:req.body.title,content:req.body.content}).then((val)=>{
        console.log(val);
        res.redirect('/')
    })

}

module.exports.get_blog = (req,res) => {
    res.render('blog');
}

