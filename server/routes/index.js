const express = require('express');
const router = express.Router();


//@path - '/'
// // http method - GET
// response --> render index.ejs


router.get('/',(req,res)=>{
    console.log(req.body)
    res.send('index')
})

module.exports = router;