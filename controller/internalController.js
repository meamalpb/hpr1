const firebase = require('firebase');

module.exports.get_internal_views = async (req,res) => {
    const blogsData= await firebase.firestore().collection('blogs').get();
    const userData= await firebase.firestore().collection('users').where('active', '==', 1).get();
    const data = blogsData.docs;
    const data2= userData.docs;
   
  
    
    res.render('internal-views',{data,data2});
  
 }