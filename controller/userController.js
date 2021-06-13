const { render } = require('ejs');
const firebase = require('firebase');

module.exports.get_login = (req,res) => {
    res.render('userlogin');
    //console.log(firebase.auth().currentUser.uid)
}

module.exports.get_register = (req,res) => {
    res.render('userreg')
}

module.exports.signout = (req,res) =>{
  firebase.auth().signOut().then(()=>{
    res.redirect('/userlogin');
  })
}

//post register = creates a new user
module.exports.post_register = (req,res) => {
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
  .then((userCredential) => {
    firebase.firestore()
    .collection('users').doc(userCredential.user.email).get()
    .then((docSnap)=>{
      if(docSnap.exists){
        firebase.firestore().collection('users').doc(userCredential.user.email)
        .update({
          job_count:firebase.firestore.FieldValue.increment(1)
        })
      }
      else{
          firebase.firestore().collection('users').doc(userCredential.user.email).set({email:userCredential.user.email,userType:0,username:req.body.username,active:0,rtype:'new job',job_count:0,phone:req.body.phone});
      }
    })
  })
    res.redirect('/wait');
}


//post login = logs in with email and password
module.exports.post_login = async (req,res) => {
firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then((userCredential)=>{
  firebase.firestore().collection('users').doc(userCredential.user.email).get().then((val)=>{
    if(val.data().userType==1){
      res.redirect('/internalviews')
    }
    else if(val.data().active==0){
        res.redirect('/wait')
    }
    else if(val.data().active==1){
      res.redirect('/userview')
    }
    else if(val.data().active==2){
      res.send('Sorry you were rejected')
    }
  })

    })
    
  }

  module.exports.displayUserView =async (req,res) => {
    const val1=await firebase.auth().currentUser.email;
    // const val3= await firebase.firestore().collection('users').doc(val1).get();
    await firebase.firestore().collection('users').doc(val1).get().then(async(val3)=>{
      if(val3.data().userType==0){
          await firebase.firestore().collection('blogs').where('useremail','==',val1).get().then(async(val2)=>{
            res.render('userview',{val2,val3})
          })
      }else if(val3.data().userType==1){
        await firebase.firestore().collection('blogs').get().then((val2)=>{
          res.render('userview',{val2,val3})
        })
      }else{
        res.send('no such user found')
      }
    });
}

module.exports.postjob = async(req,res)=>{
  const currentuser = await firebase.auth().currentUser
  const val = await firebase.firestore().collection("users").doc(currentuser.email).get()
  const name1=req.body.name;
  const projecttitle1=req.body.projecttitle;
  if(currentuser!=null){
    if(val.data().userType==0){
  

      
      await firebase.firestore().collection('blogs').add({name:req.body.name,guidename :req.body.guidename,guidedepartment:req.body.guidedepartment,degree:req.body.degree,branch:req.body.branch,projecttitle:req.body.projecttitle,projectcategory:req.body.projectcategory,projectdescription:req.body.projectdescription ,useremail:currentuser.email,
        datetime: firebase.firestore.FieldValue.serverTimestamp()})
      .then((data)=>{
        res.render('fileenter',{name1,projecttitle1});
     })

    }else{
      res.send('you are not allowed to add jobs')
    }
   //const remove = await firebase.firestore().collection('users').doc(currentuser.email).update({'active':0})
    //const removeUser = await currentuser.delete()
    }else{
    res.send('no permission')
  }
 }








module.exports.addblogs=async (req,res)=>{
  const currentuser = await firebase.auth().currentUser
  firebase.firestore().collection('users').doc(currentuser.email).get().then((doc)=>{
    if(doc.data().active==1){
      res.render('blog-reg');
    }
    else{
      res.send('No permission')
    }
  })
}




module.exports.edit_job = (req,res) => {
  firebase.firestore().collection('blogs').doc(req.params.id).get().then((val)=>{
      res.render('editJob',{val});
  })
}

exports.getwait = (req,res) => {
  res.render('wait');
}

module.exports.postedit_job = async (req,res) => {
  const val = await firebase.firestore().collection('blogs').doc(req.params.id).update({
    'title':req.body.title,
    'content':req.body.content
  });
  const cUser = firebase.auth().currentUser;
  const remove = await firebase.firestore().collection('users').doc(cUser.email).update({'active':0})
  res.redirect('/')

}

module.exports.post_forgotpassword=(req,res)=>{
  var auth=firebase.auth()
  var email=req.body.email
  if(email!=""){
    auth.sendPasswordResetEmail(email).then(function(){
   console.log('email has send to the mail account')
    }).catch(function(error){
      console.log(error)
    })
  }else{
   console.log("please type your email first!!!")
  }
  
}
module.exports.get_forgotpassword=(req,res)=>{
  res.render('forgot_password')
}



module.exports.deletecuser = async (req,res) => {
  const cuser = firebase.auth().currentUser;
  const dbdelete = firebase.firestore().collection('users').doc(cuser.email).delete();
  const remove = cuser.delete();
  res.send('success')

}

// module.exports.getotp=(req,res)=>{
//   res.render('otp')
// }
// module.exports.otpgenerate=(req,res)=>{
//  let recaptch= new firebase.auth.RecaptchaVerifier('recaptcha')
//  let number='+918086176448'
//  firebase.auth.signInWithPhoneNumber(number,recaptch).then(function(e){
//    let code=prompt('enter otp ','')
//  })
  
// }
// module.exports.otpverify=(req,res)=>{
  
// }
module.exports.formdata=async (req,res)=>{
 userdata= await firebase.firestore().collection('users').doc(req.params.id);
 res.render('form',{userdata});
}
