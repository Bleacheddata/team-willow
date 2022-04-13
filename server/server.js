const express = require("express");
const app = express();
const path = require('path');
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var multer = require('multer'),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:admin@cluster0.s4q5b.mongodb.net/TeamWillow?retryWrites=true&w=majority");
var fs = require('fs');
var user = require("./model/user.js");

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./controller/cards"));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: false
}));




app.use(express.static(path.join(__dirname, 'build')));


app.use("/", (req, res, next) => {
    try {
        if (req.path == "/login" || req.path == "/register" || req.path == "/") {
            next();
        } else {
            /* decode jwt token if authorized*/
            jwt.verify(req.headers.token, 'shhhhh11111', function (err, decoded) {
                if (decoded && decoded.user) {
                    req.user = decoded;
                    next();
                } else {
                    return res.status(401).json({
                        errorMessage: 'User unauthorized!',
                        status: false
                    });
                }
            })
        }
    } catch (e) {
        res.status(400).json({
            errorMessage: 'Something went wrong!',
            status: false
        });
    }
})

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
app.get("/", (req, res) => {
    res.status(200).json({
        status: true,
        title: 'Apis'
    });
});

/* login api */
app.post("/login", (req, res) => {
    try {
        if (req.body && req.body.username && req.body.password) {
            user.find({ username: req.body.username }, (err, data) => {
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

/* register api */
app.post("/register", (req, res) => {
    try {
        if (req.body && req.body.username && req.body.password) {

            user.find({ username: req.body.username }, (err, data) => {

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


function checkUserAndGenerateToken(data, req, res) {
    jwt.sign({ user: data.username, id: data._id }, 'shhhhh11111', { expiresIn: '1d' }, (err, token) => {
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
            });
        }
    });
}

// get driver connectionn
const dbo = require("./db/conn");

app.listen(port,() => {
    // perform a database connection when server starts
    dbo.connectToServer(function (err) {
        if (err) console.error(err);

    });
    console.log(`Server is running on port: ${port}`);
});