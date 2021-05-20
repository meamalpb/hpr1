const express               = require("express");
const bodyParser            = require("body-parser");
var app                     = express();
const config                = require('./config')
const firebase              = require('firebase')
firebase.initializeApp(config);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs'); 


app.get('/',(req,res)   =>  { 
   res.render('home');
 });

 app.post('/',(req,res)=>{
    console.log(req.body);
    res.redirect('/');
 })

app.get('/admin-login',(req,res)   =>  {
    res.render('Admin-login')
});
app.get('/costumer-login',(req,res)   =>  {
    res.render('costumer-login')
});
app.get('/costumer-reg',(req,res)   =>  {
    res.render('costumer-reg')
});


app.get('/register',(req,res)   =>  {
    res.render('register')
});

app.listen(3000,()=>{console.log('http://localhost:3000/')});

