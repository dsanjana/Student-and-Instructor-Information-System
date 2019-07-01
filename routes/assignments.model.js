const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Assignments
let Assignments = new Schema({
    courseName: {
        type: String
      },
    assignmentName: {
        type: String
    },
    assignmentLink: {
        type: String
    },
    uploadedDate: {
        type: String
    },
    dueDate: {
        type: String
    }
}, {
        collection: 'assignments'
    });

module.exports = mongoose.model('Assignments', Assignments);