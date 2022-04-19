const express = require("express");
const app = express();
const path = require('path');
const cors = require("cors");
require("dotenv").config({
    path: "./config.env"
});

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
bodyParser = require('body-parser'),
    mongoose = require("mongoose");
let fs = require('fs');
let user = require("./model/user.js");
let card = require("./model/card.js");

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: false
}));


app.use(express.static(path.join(__dirname, 'build')));



function createCardPackFrom(allCards) {

    let commonCards = allCards.filter(element => element.rarity == "Common");

    let uncommonCards = allCards.filter(element => element.rarity == "Uncommon");

    let rareCards = allCards.filter(element => element.rarity == "Rare");

    let ultraRareCards = allCards.filter(element => element.rarity == "Ultra-Rare");



    uncommonCards.splice(0, 20);
    rareCards.splice(0, 30);
    ultraRareCards.splice(0, 38)

    let cardsToPickFrom = [...commonCards, ...uncommonCards, ...rareCards, ...ultraRareCards];

    let cardPack = shuffle(cardsToPickFrom);

    cardPack.splice(0, 67);

    return cardPack;
}

function shuffle(array) {
    let currID = array.length;
    // There remain elements to shuffle
    while (0 !== currID) {
        // Pick a remaining element
        let randID = Math.floor(Math.random() * currID);
        currID -= 1;
        // Swap it with the current element.
        let temp = array[currID];
        array[currID] = array[randID];
        array[randID] = temp;
    }
    return array;
}


app.get("/user", function (req, res) {

    let decodedToken;
    let token = req.headers.authorization;
    jwt.verify(token, 'shhhhh11111', function (err, decoded) {
        if (err) {

            console.log(err + decoded);
            throw err;

        }
        decodedToken = decoded;
    });

    if (decodedToken) {

        user.findOne({
            username: decodedToken.user
        }, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
        });

    }



});

app.get("/user/packcount", function (req, res) {

    let decodedToken;
    let token = req.headers.authorization;
    jwt.verify(token, 'shhhhh11111', function (err, decoded) {
        if (err) {

            console.log(err);

        }
        decodedToken = decoded;
    });

    if (decodedToken != undefined) {
        let packCount;
        user.findOne({
            username: decodedToken.user
        }, function (err, result) {
            if (err) throw err;
            packCount = result.packs;
            res.json(packCount);
        });

    }



});


app.get("/user/buypack", function (req, res) {

    console.log(req.headers.authorization);
    let decodedToken;
    let token = req.headers.authorization;
    jwt.verify(token, 'shhhhh11111', function (err, decoded) {
        if (err) {

            console.log(err);

        }
        decodedToken = decoded;
    });

    if (decodedToken != undefined) {

        user.findOne({
            username: decodedToken.user
        }, function (err, result) {
            if (err) throw err;
            console.log(result);
            gold = result.gold;

            if(gold >= 100) {

                user.updateOne({
                    username: decodedToken.user
                }, {
                    $inc: {
                        gold: -100,
                        packs: +1
                        
                    }              
                }, function (err) {
                    if (err)  {
                        res.json(err);
                    } 

                    res.json("Pack bought successfully");
                })
            }


        })

    } else {
        res.status(400).send({
            message: 'Error purchasing pack!'
         });
    }


})


app.put("/user/cardpack", function (req, res) {
    console.log(req.headers.authorization);
    let decodedToken;
    let token = req.headers.authorization;
    jwt.verify(token, 'shhhhh11111', function (err, decoded) {
        if (err) {

            console.log(err);

        }
        decodedToken = decoded;
    });

    if (decodedToken != undefined) {

        let packCount;
        user.findOne({
            username: decodedToken.user
        }, function (err, result) {
            if (err) throw err;
            packCount = result.packs;


            if (packCount > 0) {
                card.find({}, function (err, result) {
                    if (err) throw err;

                    let cardPack = createCardPackFrom(result);

                    res.json(cardPack);


                    user.updateOne({
                        username: decodedToken.user
                    }, {
                        $inc: {
                            packs: -1
                        },
                        $push: {
                            cardCollection: {
                                $each: cardPack
                            }
                        }
                    }, function (err) {
                        if (err) {
                            res.json(err);

                        }



                    })

                })


            } else {
                res.json("No more card packs available");
            }
        })



    } else {
        res.json("User is not logged in");
    }





});



// app.use("/", (req, res, next) => {
//     try {
//         if (req.path == "/login" || req.path == "/register" || req.path == "/") {
//             next();
//         } else {
//             /* decode jwt token if authorized*/
//             jwt.verify(req.headers.token, 'shhhhh11111', function (err, decoded) {
//                 if (decoded && decoded.user) {
//                     req.user = decoded;
//                     next();
//                 } else {
//                     return res.status(401).json({
//                         errorMessage: 'User unauthorized!',
//                         status: false
//                     });
//                 }
//             })
//         }
//     } catch (e) {
//         res.status(400).json({
//             errorMessage: 'Something went wrong!',
//             status: false
//         });
//     }
// })



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

/* register api */
app.post("/register", (req, res) => {
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


app.listen(port, () => {
    // perform a database connection when server starts
    mongoose.connect("mongodb+srv://admin:admin@cluster0.s4q5b.mongodb.net/TeamWillow?retryWrites=true&w=majority");

    console.log(`Server is running on port: ${port}`);
});