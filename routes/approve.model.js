const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Approve = new Schema({
    courseno: {
        type: String
    },

    coursename: {
        type: String
    },

    credits: {
        type: String
    },

    coursedetails: {
        type: String
    },

    instructor: {
        type: String
    },

},{
    collection : 'approve'

});

module.exports = mongoose.model('Approve',Approve);