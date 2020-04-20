const mongoose = require('mongoose');
mongoose.connect('monmongodb+srv://testuser:testuser@cluster0-q4bfx.mongodb.net/test?retryWrites=true&w=majorityodb+srv://testuser:testuser@cluster0-q4bfx.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));

const REGISTER = require('./register')
const DEVELOPERS = require('./developers')

module.exports = {
    REGISTER,DEVELOPERS
}