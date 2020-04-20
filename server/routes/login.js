var express = require('express');
var router = express.Router();
const db = require('../models')
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

router.get('/',(req,res)=>{
    res.render('login')
})

router.post('/',(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    db.REGISTER.findOne({userName:userName})
    .then((data)=>{
        if(!data){
            return res.status(404).json({msg:"user not found register?"})
        }
        else if(!data.password){
            return res.status(404).json({msg:"wrong passowrd"})
        }
        else{
            bcrypt.compare(password,data.password,(err,result)=>{
                if(err) return console.log("incorect password")
                if(result){
                    res.redirect('/index')
                }
            })
        }
    }).catch((err)=>{
        res.status(404).json({msg:"incorrect username"})
    } )
})

module.exports = router;