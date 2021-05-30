const firebase = require('firebase');




module.exports.get_blogs2 = (req,res) => {
  
firebase.firestore().collection('blogs').get().then(snapshot => {
   
  const data =snapshot.docs;
  res.render('blogs2',{data});
   
   
 
 });
   
}