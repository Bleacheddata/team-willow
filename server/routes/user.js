
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
let user = require("../model/user.js");
let card = require("../model/card.js");


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


router.get("/", function (req, res) {
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
            _id: decodedToken.id
        },{ username: 1, packs: 1, gold: 1 },function (err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
        });

    }



});



router.put("/gold", function (req, res) {

   
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
              _id: decodedToken.id
        }, { username: 1, packs: 1, gold: 1 }, function (err, result) {
            if (err)  {
                res.send(err);
                throw err;
              
            } 
            else {
                gold = result.gold;

                if(gold >= 100) {
    
                    user.updateOne({
                        _id: decodedToken.id
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
            }

            
            
          


        })

    } else {
        res.status(400).send({
            message: 'Error purchasing pack!'
         });
    }


})


router.put("/cardpacks", function (req, res) {
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
            _id: decodedToken.id
        }, { username: 1, packs: 1, gold: 1 }, function (err, result) {
            if (err) throw err;
            packCount = result.packs;


            if (packCount > 0) {
                card.find({}, function (err, result) {
                    if (err) throw err;

                    let cardPack = createCardPackFrom(result);

                    res.json(cardPack);


                    user.updateOne({
                        _id: decodedToken.id
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

module.exports = router;