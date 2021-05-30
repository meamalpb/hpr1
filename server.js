const express               = require("express");
var app                     = express();
const config                = require('./config')
const firebase              = require('firebase')
const authRoutes            = require('./routes/authRoutes')
const blogRoutes            = require('./routes/blogRoutes');

firebase.initializeApp(config);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs'); 

app.get('/',(req,res)   =>  { 
   res.render('home');
 });

 //all routes related to authorisation is in authRoutes
 app.use(authRoutes);
 app.use(blogRoutes);
 


app.listen(3000,()=>{console.log('http://localhost:3000/')});

