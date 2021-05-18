const express               = require("express");
const bodyParser            = require("body-parser");
var app                     = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs'); 


app.get('/',(req,res)   =>  { 
   res.render('home');
 });

app.get('/login',(req,res)   =>  {
    res.render('login')
});

app.get('/register',(req,res)   =>  {
    res.render('register')
});

app.listen(3000,()=>{console.log('http://localhost:3000/')});




