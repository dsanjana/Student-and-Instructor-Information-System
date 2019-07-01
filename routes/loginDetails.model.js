const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Login = new Schema({
    email: {
        type: String
    },

    userID: {
        type: String
    },
    time:{
        type: String
    }
},{
    collection : 'login'

});

module.exports = mongoose.model('Login',Login);