const firebase = require('firebase');

module.exports.get_internal_views = async (req,res) => {
    const blogsData= await firebase.firestore().collection('blogs').get();
    const userData= await firebase.firestore().collection('users').get();
    const data = blogsData.docs;
    const data2= userData.docs;
    res.render('internalpage',{data,data2});
  
 }
 
module.exports.get_internal_login= async (req,res) => {
    res.render('internallogin')
}
module.exports.get_internal_register= async (req,res) => {
    res.render('internalreg')
}