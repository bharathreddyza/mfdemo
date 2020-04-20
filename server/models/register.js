const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({
    email:{
       type: String,
       required:['email is mandotory'],
    },
    userName:{
       type:String,
       required:['username is required']
    },
    password:{
        type:String,
        required:['password isrequired']
    },
    phone:Number,
    profilePic:String,
    description:String,
    projects:String

})

const REGISTER = mongoose.model('register',registerSchema)

module.exports = REGISTER
