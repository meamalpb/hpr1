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