const express = require('express');
const app = express();
const port =  4200;
const path = require('path');
const bodyParser = require('body-parser')
var multer  = require('multer')
const nodemailer = require("nodemailer");

var upload = multer({ dest: 'uploads/' })
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({extended: false}))
app.use('/public',express.static(path.join(__dirname,'public')))
//parse application json 
app.use(bodyParser.json)

app.set('view engine' , 'ejs')


app.use('/public' , express.static(path.join(__dirname,'public')));

const indexroute = require('./routes/index')
const developersroute = require('./routes/developers')
const registerroute = require('./routes/register')
const loginRoute = require('./routes/login')

app.use('/',indexroute)
app.use('/developers',developersroute);
app.use('/register',registerroute)
app.use('/login',loginRoute)

app.listen(port,()=> console.log(`ports running at ${port}`))