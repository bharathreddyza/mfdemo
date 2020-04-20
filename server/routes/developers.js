var express = require('express');
var router = express.Router();
const db = require('../models')

router.get('/', (req, res) =>{
    res.render('developers', {data:data})
    });

router.get('/:id',(req,res)=>{
    db.REGISTER.find()
    .then((data)=>{
        res.render('developerpage',{data:data})

    }).catch((err)=>console.log(err))
})

router.post('/:id',(req,res)=>{
    res.render('developeredit')
})
    module.exports = router;
