
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
let user = require("../model/user.js");


//checks if username and password are valid against database, and sends a JWT token to the user if valid
router.post("/login", (req, res) => {
    console.log("Login");
    try {
        if (req.body && req.body.username && req.body.password) {
            user.find({
                username: req.body.username
            }, (err, data) => {
                if (data.length > 0) {

                    if (bcrypt.compareSync(data[0].password, req.body.password)) {
                        checkUserAndGenerateToken(data[0], req, res);
                    } else {

                        res.status(400).json({
                            errorMessage: 'Username or password is incorrect!',
                            status: false
                        });

                    }

                } else {
                    res.status(400).json({
                        errorMessage: 'Username or password is incorrect!',
                        status: false
                    });
                }
            })
        } else {
            res.status(400).json({
                errorMessage: 'Add proper parameter first!',
                status: false
            });
        }
    } catch (e) {
        res.status(400).json({
            errorMessage: 'Something went wrong!',
            status: false
        });
    }

});

//registers the user with the username and password, returns an error if user already exists
router.post("/register", (req, res) => {
    try {
        if (req.body && req.body.username && req.body.password) {

            user.find({
                username: req.body.username
            }, (err, data) => {

                if (data.length == 0) {

                    let User = new user({
                        username: req.body.username,
                        password: req.body.password
                    });
                    User.save((err, data) => {
                        if (err) {
                            res.status(400).json({
                                errorMessage: err,
                                status: false
                            });
                        } else {
                            res.status(200).json({
                                status: true,
                                title: 'Registered Successfully.'
                            });
                        }
                    });

                } else {
                    res.status(400).json({
                        errorMessage: `UserName ${req.body.username} Already Exist!`,
                        status: false
                    });
                }

            });

        } else {
            res.status(400).json({
                errorMessage: 'Add proper parameter first!',
                status: false
            });
        }
    } catch (e) {
        res.status(400).json({
            errorMessage: 'Something went wrong!',
            status: false
        });
    }
});

//generates a JWT token
function checkUserAndGenerateToken(data, req, res) {
    jwt.sign({
        user: data.username,
        id: data._id
    }, 'shhhhh11111', {
        expiresIn: '1d'
    }, (err, token) => {
        if (err) {
            res.status(400).json({
                status: false,
                errorMessage: err,

            });


        } else {
            res.json({
                    message: 'Login Successfully.',
                    token: token,
                    status: true

                }

            );


        }
    });
}


module.exports= router;