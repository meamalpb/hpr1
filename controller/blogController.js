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


module.exports.get_blogs2 = (req,res) => {
    firebase.firestore().collection('blogs').get().then(snapshot => {
      const data =snapshot.docs;
      res.render('blogs2',{data});
     });
       
    }

module.exports.edit_blog = (req,res) => {
    firebase.firestore().collection('blogs').doc(req.params.id).get().then((val)=>{
        res.render('editBlog',{val});
        console.log(val.data())
    })
}