const firebase = require('firebase');


module.exports.get_admin_login=(req,res)=>{
    res.render('adminlogin')
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
  const userData= await firebase.firestore().collection('users').get();
  const userData2= await firebase.firestore().collection('users').where('active', '==', 0).get();
  const data = blogsData.docs;
  const data2= userData.docs;
  const data3= userData2.docs;
  res.render('adminpage',{data,data2,data3});  
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

module.exports.changeusertype=async(req,res)=>{
  
    await firebase.firestore().collection('users').doc(req.body.email).get().then(async(val3)=>{
      if(val3.data().userType==0){
        if(req.body.usertypeselect=='internal'){
          firebase.firestore().collection('users').doc(req.body.email).update({
            userType:1,
            
          }).then(()=>{
            console.log('updated to internal user')
          })
        }else if(req.body.usertypeselect=='admin'){
         console.log('admin updated')
        }else{
          console.log('already a user')
        }
      }else  if(val3.data().userType==1){
        if(req.body.usertypeselect=='user'){
          firebase.firestore().collection('users').doc(req.body.email).update({
            userType:0,
            
          }).then(()=>{
            console.log('updated to normal user')
          })
        }else if(req.body.usertypeselect=='admin'){
         console.log('admin updated')
        }else{
          console.log('already a internal user')
        }
      }
    }
    ).then(()=>{res.redirect('/blogs')})
}


