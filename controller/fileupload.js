var firebaseConfig = {
    apiKey: "AIzaSyB-bxU-jIijwf2dVYAIDDOR4-Pg-38PNeM",
    authDomain: "blog-a4e41.firebaseapp.com",
    projectId: "blog-a4e41",
    storageBucket: "blog-a4e41.appspot.com",
    messagingSenderId: "684909501088",
    appId: "1:684909501088:web:c3b7722759446ecfc507c5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

          var uploader=document.getElementById('uploader');
  var fileButton =document.getElementById('fileButton');

//   fileButton.addEventListener('change', function(e){
//   var file= e.target.files[0];
//   var storage= firebase.storage();
//   var storageRef=storage.ref("test/"+file.name);
//   var task= storageRef.put(file);
//   task.on('state_changed',
//   function progress(snapshot){
//       var percentage=(snapshot.bytesTransferred /snapshot.totalBytes)*100;
//       uploader.value=percentage;

//   },
//   function error(err){},
//   function complete(){}
//   );
// });

fileButton.addEventListener('change', function(e){ 
    //Get files
    for (var i = 0; i < e.target.files.length; i++) {
        var imageFile = e.target.files[i];

        uploadImageAsPromise(imageFile);
    }
});

//Handle waiting to upload each file using promise
function uploadImageAsPromise (imageFile) {
    return new Promise(function (resolve, reject) {
        var storageRef = firebase.storage().ref("test2/"+imageFile.name);

        //Upload file
        var task = storageRef.put(imageFile);

        //Update progress bar
        task.on('state_changed',
            function progress(snapshot){
                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                uploader.value = percentage;
            },
            function error(err){

            },
            function complete(){
                var downloadURL = task.snapshot.downloadURL;
            }
        );
    });
} 