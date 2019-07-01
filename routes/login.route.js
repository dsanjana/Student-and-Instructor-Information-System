const express = require('express')
const loginRoute = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//require user model
const User = require('./user.model')
const Login = require('./loginDetails.model')

loginRoute.route('/loginUser').post(function (req, res) {

    console.log(req.body.email)
    console.log(req.body.passwrd)

    let userToken;
    return User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(500).json({ message: "User does not exists" })
                //throw new Error("awdakjwdgkajwd")
            }
            userToken = user
            return bcrypt.compare(req.body.passwrd, user.passwrd)
        })
        .then(isEqual => {
            if (!isEqual) {
                return res.status(500).json({ message: "Password is incorrect" })
                //throw new Error("awdakjwdgkajwd")
            }
            const token = jwt.sign({ userId: userToken.id, email: userToken.email, typeOfEmp: userToken.typeOfEmp, name: userToken.lecName, idNumber: userToken.lecId }, 'somesupersecretkey', {
                expiresIn: '1h'
            });
            return res.send({ userId: userToken.id, email: userToken.email, typeOfEmp: userToken.typeOfEmp, name: userToken.lecName, idNumber: userToken.lecId, token: token, tokenExpiration: 1 })
        }).catch(err => {

            //throw new Error("awdakjwdgkajwd")
        })

});

loginRoute.route('/loginDetails').post(function (req, res) {
    if (!req.isAuth) {
        return res.status(500).json({ message: "Invalid authentication tutorial"})
     }
    const login = Login(req.body)
    return login.save()
    .then(loginDetails => {
        return res.status(200).json({ message: "Login details added" })
    })
    .catch(err => {
        return res.status(500).json({ error: "Add failed" })
    })
})

loginRoute.route('/getLoginDetails/:email').get(function (req, res) {
    if (!req.isAuth) {
        return res.status(500).json({ message: "Invalid authentication tutorial"})
     }
    return Login.findOne({email: req.params.email}).sort({_id: -1})
    .then(loginDetails => {
        return res.status(200).json(loginDetails)
    })
    .catch(err => {
        return res.status(500).json({ error: "Add failed" })
    })
})

module.exports = loginRoute;

