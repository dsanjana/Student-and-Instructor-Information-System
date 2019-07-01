const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let uploadedAssignment = new Schema({
    deadlinedate: {
        type: String
    },
    deadlinetime:{
        type: String
    },

    name: {
        type: String
    },
    subject: {
        type: String
    },
    lecturer: {
        type: String
    },
    student: {
        type: String
    },
    filename:{
        type:String
    },
    uploadedate:{
        type:String
    },
    uploadtime:{
        type:String
    },

    late:{
        type:String
    },
    uname:{
        type:String
    }
},{
    collection: 'uploadedAssignments'
});

module.exports = mongoose.model('uploadedAssignment', uploadedAssignment);