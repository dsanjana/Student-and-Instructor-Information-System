const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    lecId: {
        type: String
    },

    lecName: {
        type: String
    },

    typeOfEmp: {
        type: String
    },

    lecturedetails: {
        type: String
    },

    faculty: {
        type: String
    },

    passwrd: {
        type: String
    },
    email: {
        type: String
    },


},{
    collection : 'lecture'

});

module.exports = mongoose.model('User',User);