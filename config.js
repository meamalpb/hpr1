require("dotenv").config();

var firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DMN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSENGER_SENDER,
    appId: process.env.APP_ID
  };

  module.exports = firebaseConfig;