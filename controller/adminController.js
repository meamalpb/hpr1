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
  //  firebase.firestore().collection('blogs').get().then(snapshot => {
  //   const data =snapshot.docs;
  //   res.render('blogs2',{data});
  //  });
 
  
   
module.exports.get_blogs2 = async (req,res) => {
  const blogsData= await firebase.firestore().collection('blogs').get();
  const userData= await firebase.firestore().collection('userData').where('active', '==', 1).get();
  const data = blogsData.docs;
  const data2= userData.docs;
 

  
  res.render('blogs2',{data,data2});

     
  }

  module.exports.get_admin_user_request=(req,res)=>{
    firebase.firestore().collection('requests').get().then(snapshot => {
      const data =snapshot.docs;
      res.render('admin-view-request',{data});
     });
       
    }
