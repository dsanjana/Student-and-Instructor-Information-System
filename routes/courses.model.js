const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let View = new Schema({
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
        istructorId:{

            type:String


        }
},{
    collection : 'view'

});

module.exports = mongoose.model('View',View);