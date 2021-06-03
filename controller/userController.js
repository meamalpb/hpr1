const firebase = require('firebase');

module.exports.get_login = (req,res) => {
    res.render('login');
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
          firebase.firestore().collection('users').doc(userCredential.user.email).set({email:userCredential.user.email,userType:0,username:req.body.username,active:0,rtype:'new job',job_count:0});
      }
    })
  })
    res.redirect('/wait');
}


//post login = logs in with email and password
module.exports.post_login = async (req,res) => {
firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then((userCredential)=>{
  firebase.firestore().collection('users').doc(userCredential.user.email).get().then((val)=>{
    if(val.data().active==0){
        res.redirect('/wait')
    }
    else if(val.data().active==1){
      res.redirect('/addblog')
    }
    else if(val.data().active==2){
      res.send('Sorry you were rejected')
    }
  })

    })
    
  }


module.exports.get_register = (req,res) => {
    res.render('register')
}



exports.addblogs=async (req,res)=>{
  // const data = firebase.auth().currentUser
  // console.log(data.email)
  res.render('blog-reg');
}

module.exports.postblogs = async(req,res)=>{
 const currentuser = await firebase.auth().currentUser
  const data = await firebase.firestore().collection('blogs').add({title:req.body.title,content:req.body.content,user:currentuser.email,datetime: firebase.firestore.FieldValue.serverTimestamp()});

  const remove = await firebase.firestore().collection('users').doc(currentuser.email).update({'active':0})
  res.redirect('/wait')

}


module.exports.edit_blog = (req,res) => {
  firebase.firestore().collection('blogs').doc(req.params.id).get().then((val)=>{
      res.render('editBlog',{val});
  })
}

exports.getwait = (req,res) => {
  res.render('wait');
}

module.exports.postedit_blog = async (req,res) => {
  firebase.firestore().collection('blogs').doc(req.params.id).update({
    'title':req.body.title,
    'content':req.body.content
  }).then((val)=>  {
    res.redirect('/blogs')
  console.log(firebase.auth().currentUser)
  })
  .catch((err)=>{console.log(err)})
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