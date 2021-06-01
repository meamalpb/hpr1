const firebase = require('firebase');

//get post function
module.exports.get_login = (req,res) => {
    res.render('login');
}


//post register = creates a new user
module.exports.post_register = (req,res) => {
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
  .then((userCredential) => {
    //saves the user email with user type : 1
    firebase.firestore().collection('users').doc(userCredential.user.uid).set({email:userCredential.user.email,userType:1}).then((res)=>{console.log(res)})
  })
    res.redirect('/');
}


//post login = logs in with email and password
module.exports.post_login = (req,res) => {
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
  .then((userCredential) => {
    console.log(userCredential);
  })
    res.redirect('/blogs2');
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
      console.log(val.data())
  })
}

