const nodemailer = require('nodemailer');

const express = require('express');
const UserRoutes = express.Router();
    
const bcrypt = require('bcryptjs');
// Require Business model in our routes module
let User = require('./user.model');


// Defined store route
UserRoutes.route('/add').post(function (req, res) {
    if (!req.isAuth) {
        return res.status(500).json({ message: "Invalid authentication tutorial"})
     }
    // if (!req.isAuth) {
    //     throw new Error("User not authenticated")
    // }
    return User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                throw new Error("User exist already")
            }
            return bcrypt.hash(req.body.passwrd, 12)
        })
        .then(hasedPassword => {
            const user = User({
                lecId: req.body.lecId,
                lecName: req.body.lecName,
                typeOfEmp: req.body.typeOfEmp,
                lecturedetails: req.body.lecturedetails,
                faculty: req.body.faculty,
                passwrd: hasedPassword,
                email: req.body.email
            })

            return user.save()
                .then(result => {
                    res.status(200).json({ 'massage': 'User is added successfully' });
                    console.log(result)
                })
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});


// Defined get data(index or listing) route
UserRoutes.route('/').get(function (req, res) {
    if (!req.isAuth) {
        return res.status(500).json({ message: "Invalid authentication tutorial"})
     }
    User.find(function (err, lecture) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(lecture);
        }
    });
});

// Defined edit route
UserRoutes.route('/edit/:id').get(function (req, res) {
    if (!req.isAuth) {
        return res.status(500).json({ message: "Invalid authentication tutorial"})
     }
    let id = req.params.id;
    User.findById(id, function (err, lecture) {
        res.json(lecture);
    });
});

//  Defined update route
UserRoutes.route('/update/:id').post(function (req, res) {
    if (!req.isAuth) {
        return res.status(500).json({ message: "Invalid authentication tutorial"})
     }
    User.findById(req.params.id, function (err, lecture) {
        if (!lecture)
            res.status(404).send("data is not found");
        else {
            lecture.lecId = req.body.lecId;
            lecture.lecName = req.body.lecName;
            lecture.typeOfEmp = req.body.typeOfEmp;
            lecture.lecturedetails = req.body.lecturedetails;
            lecture.faculty = req.body.faculty;
            //lecture.passwrd = req.body.passwrd;
            lecture.email = req.body.email;

            lecture.save().then(lecture => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

// Defined delete | remove | destroy route
UserRoutes.route('/delete/:id').get(function (req, res) {
    if (!req.isAuth) {
        return res.status(500).json({ message: "Invalid authentication tutorial"})
     }
    User.findByIdAndRemove({ _id: req.params.id }, function (err, lecture) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
});


var smtpTransport = nodemailer.createTransport({

    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'fernandopumudu@gmail.com',
        pass: '0112616997'
    },
    tls: { rejectUnauthorized: false },
    debug: true
});

UserRoutes.route('/send').post(function (req, res) {
   //if (!req.isAuth) {
   //     return res.status(500).json({ message: "Invalid authentication tutorial"})
   //  }
    console.log("start");

    var mailOptions = {

        to: req.body.email,
        subject: "Account Created ",
        text: "Your Account was Created Sucessfully for Id :" + req.body.lecId

    }


    //check whether mail is working
    console.log(mailOptions);

    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error + "not working");

        } else {
            console.log("Message sent Succesfully : " + response.message);

        }
    });

});


module.exports = UserRoutes;