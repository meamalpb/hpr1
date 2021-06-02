const firebase = require('firebase');

module.exports.get_login = (req,res) => {
    res.render('login');
    console.log(firebase.auth().currentUser);

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
          firebase.firestore().collection('users').doc(userCredential.user.email).set({email:userCredential.user.email,userType:1,username:req.body.username,active:1,rtype:'new job',job_count:0});
      }
    })
  })
    res.redirect('/wait');
}


//post login = logs in with email and password
module.exports.post_login = async (req,res) => {
  const data = await firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password);
  res.redirect('/wait');
    
}


module.exports.get_register = (req,res) => {
    res.render('register')
}



module.exports.addblogs=(req,res)=>{
  res.render('blog-reg');
}

module.exports.postblogs=async(req,res)=>{
  console.log(req.body)
  firebase.firestore().collection('blogs').add({title:req.body.title,content:req.body.content}).then((val)=>{
      console.log(val);
      res.redirect('/')
  })

}


module.exports.edit_blog = (req,res) => {
  firebase.firestore().collection('blogs').doc(req.params.id).get().then((val)=>{
      res.render('editBlog',{val});
  })
}

module.exports.getwait = (req,res) => {
  res.render('wait');
}

module.exports.postedit_blog = (req,res) => {
  firebase.firestore().collection('blogs').doc(req.params.id).update({
    'title':req.body.title,
    'content':req.body.content
  }).then((val)=>  {res.redirect('/blogs')})

}
