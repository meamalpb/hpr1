const firebase = require('firebase');


module.exports.get_admin_login=(req,res)=>{
    res.render('admin-login')
   }
   
module.exports.admin_blog_view=(req,res)=>{
     res.render('/blogs2')
   }

module.exports.post_admin_login=(req,res)=>{
     firebase.firestore().collection('user_Admin').doc('1').get().then((val)=>{
       console.log(val.data())
       if(val.data().email==req.body.username && val.data().password==req.body.password){
         res.redirect('/blogs2')
     }
   })
     
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