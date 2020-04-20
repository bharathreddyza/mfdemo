var express = require('express');
var router = express.Router();
const db = require('../models')
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var multer  = require('multer')
const nodemailer = require("nodemailer");

var upload = multer({ dest: 'uploads/' })


router.get('/', (req, res)=>{
      res.render('register')
});

router.post('/',upload.array('photos', 3), async(req,res)=>{
   db.REGISTER.findOne({userName:req.body.userName})
   .then((data)=>{
         if(data){
         return res.status(409).json({message:"user already exist"})

         }
         const newUser = new db.REGISTER({
               userName:req.body.userName,
               email:req.body.email,
               profilePic:req.body.profilePic,
               phone:req.body.phone,
               descripton:req.body.descripton,
               projects:req.body.projects

               
         })
         const sendemail = `
         <h1> hello ${req.body.userName}</h1>
         `

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
      host: "bharathreddyza@gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'test@bharathreddyza.gmail.com', // generated ethereal user
        pass: 'test' // generated ethereal password
      },
      tls:{
            rejectUnauthorized:false
      }
    });
  
    // send mail with defined transport object
    let info = transporter.sendMail({
      from: '"bharath reddy" <test@bharathreddyza.gmail.com>', // sender address
      to: "abharathreddy2000@gmail.com, baz@example.com", // list of receivers
      subject: "welcome to manyfist", // Subject line
      text: " i see you register to manyfist confirm to validate", // plain text body
      html: sendemail// html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  





         //hash the password
         bcrypt.genSalt(10,function(err,salt){
               bcrypt.hash(req.body.password,salt,function(err,hash){
                     if(err) throw err
                     newUser.password =hash
                     newUser.save()
                     .then((data)=>res.render('index'))
               })
         })
   }).catch((err)=>console.log(err))
})

router.put('/',(req,res)=>{
      db.REGISTER.findByIdAndUpdate({_id:req.body.id})
      .then((data)=>res.render('developers',{data:data}))
      .catch((err)=>console.log(err))

})

router.delete('/',(req,res)=>{
      db.REGISTER.remove({_id:req.body.id})
      .then((data)=>res.render('developers',{data:data}))
      .catch((err)=>console.log(err))
})

router.get('/:id',(req,res)=>{
      db.REGISTER.findOne({_id:req.body.id})
      .then((data)=>req.render('developerpage',{data:data}))
      .catch((err)=>console.log(err))
})

router.put('/:id',(req,res)=>{
      db.REGISTER.findOneAndUpdate({_id:req.body.id})
      .then((data)=>req.render('developerpage',{data:data}))
      .catch((err)=>console.log(err))
})

router.delete('/:id',(req,res)=>{
      db.REGISTER.findOneAndDelete({_id:req.body.id})
      .then((data)=>req.render('developerpage',{data:data}))
      .catch((err)=>console.log(err))
})

module.exports = router;
