const express = require("express");
const app = express();
const path = require('path');
const cors = require("cors");
require("dotenv").config({
    path: "./config.env"
});

bodyParser = require('body-parser'),
mongoose = require("mongoose");

const auth = require('./routes/auth');
const user = require('./routes/user');


const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: false
}));


app.use(express.static(path.join(__dirname, 'build')));

app.use('/auth', auth)
app.use('/user', user)

app.get("/", (req, res) => {
    res.status(200).json({
        status: true,
        title: 'Apis'
    });
});


app.listen(port, () => {
    // perform a database connection when server starts
    mongoose.connect("mongodb+srv://admin:admin@cluster0.s4q5b.mongodb.net/TeamWillow?retryWrites=true&w=majority");

    console.log(`Server is running on port: ${port}`);
});