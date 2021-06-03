const firebase = require('firebase');


module.exports.get_admin_login=(req,res)=>{
    res.render('admin-login')
   }
   
module.exports.admin_blog_view=(req,res)=>{
     res.render('/blogs2')
   }

module.exports.post_admin_login=async (req,res)=>{

  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then((userCredential)=>{
    firebase.firestore().collection('admin').doc(userCredential.user.uid).get().then((doc) => {
      if(doc.exists){
        res.redirect('/blogs')
         }
      else{
        res.send('Wrong credentials')
      }
    })
      })
    //  const userCredential = await firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password);
    //  const check = await firebase.firestore().collection('admin').doc(userCredential.uid);
    //  console.log(userCredential.uid);
    // //  if(check.exists){
    // //    res.render('/blogs')
    // //  }
    // //  else{
    // //    res.send('Credentials wrong');
    // //  }
   }

  
   
module.exports.get_blogs2 = async (req,res) => {
  const blogsData= await firebase.firestore().collection('blogs').get();
  const userData= await firebase.firestore().collection('users').where('active', '==', 1).get();
  const data = blogsData.docs;
  const data2= userData.docs;
  res.render('blogs2',{data,data2});  
  }

module.exports.get_admin_user_request=(req,res)=>{
    firebase.firestore().collection('users')
    .where('active','==',0).get()
    .then((val)=>{
      const data = val.docs;
      res.render('admin-view-request',{data});
    })
    }
  

module.exports.activateUser=  (req,res)=>{
      firebase.firestore().collection('users').doc(req.params.id).update({
        active:1,
        
      }).then(()=>{res.redirect('/requests')})
    }


module.exports.rejectUser=  (req,res)=>{
      firebase.firestore().collection('users').doc(req.params.id).update({
        active:2,
        
      }).then(()=>{res.redirect('/requests')})
    }