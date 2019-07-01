const express = require('express')
const assignmentRoute = express.Router()

//require assignment model
const Assignment = require('./assignments.model')

//api for add new assignment
assignmentRoute.route('/addAssignment').post( function(req, res) {
    if (!req.isAuth) {
        return res.status(500).json({ message: "Invalid authentication tutorial"})
     }
    let assignment = new Assignment(req.body)
    assignment.save(function(err, assignment){
        if(err){
            console.log(err)
        }
        else{
            console.log(assignment)
            res.status(200).json({'message': 'Assignment details added Successfully!'})
        }
    })
});

//api for get all assignments
assignmentRoute.route('/getAssignments').get( function(req, res) {
    if (!req.isAuth) {
        return res.status(500).json({ message: "Invalid authentication tutorial"})
     }
    Assignment.find(function(err, assignments) {
        if(err){
            console.log(err)
        }
        else{
            console.log(assignments)
            res.json(assignments)
        }
    })
});

//api for update selected assignment
assignmentRoute.route('/getAssignment/:Id').post( function(req, res) {
    if (!req.isAuth) {
        return res.status(500).json({ message: "Invalid authentication tutorial"})
     }
    let Id = req.params.Id;

    
    Assignment.findOne({_id: Id}, function(err, assignment) {
        if(err){
            console.log(err)
        }
        else if(!assignment){
            res.status(404).send({'message': 'Data is not found!'});
        }
        else{
            assignment.courseName = req.body.courseName
            assignment.assignmentName = req.body.assignmentName
            assignment.dueDate = req.body.dueDate

            console.log(req.body.assignmentName)
            
            assignment.save(function(err, assignment){
                if(err){
                    console.log(err)
                }
                else{
                    console.log(assignment)
                    res.status(200).json({'message': 'Assignment details updated Successfully!'})
                }
            })
        }
    })
});

//api for get selected assignment by course name
assignmentRoute.route('/getAssignmentByName/:cName').get( function(req, res) {
    if (!req.isAuth) {
        return res.status(500).json({ message: "Invalid authentication tutorial"})
     }
    let cName = req.params.cName;
    Assignment.find({courseName: cName}, function(err, assignment) {
        if(err){
            console.log(err)
        }
        else{
            console.log(assignment)
            res.json(assignment)
        }
    })
});

//api for get selected assignment by id
assignmentRoute.route('/getAssignmentById/:Id').get( function(req, res) {
    if (!req.isAuth) {
        return res.status(500).json({ message: "Invalid authentication tutorial"})
     }
    let Id = req.params.Id;
    Assignment.findOne({_id: Id}, function(err, assignment) {
        if(err){
            console.log(err)
        }
        else{
            console.log(assignment)
            res.json(assignment)
        }
    })
});

//api for get selected assignment by course name and assignment name
assignmentRoute.route('/getAssignmentBycName_aName/:cName/:aName').get( function(req, res) {
    if (!req.isAuth) {
        return res.status(500).json({ message: "Invalid authentication tutorial"})
     }
    let cName = req.params.cName;
    let aName = req.params.aName;
    Assignment.findOne({courseName: cName, assignmentName: aName}, function(err, assignment) {
        if(err){
            console.log(err)
        }
        else{
            console.log(assignment)
            res.json(assignment)
        }
    })
});

//api for get selected assignment by  assignment name
assignmentRoute.route('/getAssignmentByaName/:cName').get( function(req, res) {
    if (!req.isAuth) {
        return res.status(500).json({ message: "Invalid authentication tutorial"})
     }
    let cName = req.params.cName;
    Assignment.find({courseName: cName}, function(err, assignment) {
        if(err){
            console.log(err)
        }
        else{
            console.log(assignment)
            res.json(assignment)
        }
    })
});

//api for delete assignment
assignmentRoute.route('/deleteAssignment/:Id').get( function(req, res) {
    if (!req.isAuth) {
        return res.status(500).json({ message: "Invalid authentication tutorial"})
     }
    let Id = req.params.Id;
    Assignment.findByIdAndRemove({_id: Id}, function(err, assignment) {
        if(err){
            console.log(err)
        }
        else{
            console.log(assignment)
            res.status(200).json({'message': 'Assignment details deleted Successfully!'})
        }
    })
});

//api to update all courses at one time
assignmentRoute.route('/updateAllCourses/:oldName/:newName').post(function (req,res) {
    if (!req.isAuth) {
        return res.status(500).json({ message: "Invalid authentication tutorial"})
     }

    let oldName = req.params.oldName
    let newName = req.params.newName

    Assignment.updateMany({courseName: oldName},{courseName: newName}, {multi:true}, function(err, assignments) {
        res.json(assignments)
    })
})


module.exports = assignmentRoute;