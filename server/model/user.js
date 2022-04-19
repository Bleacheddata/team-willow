const { Int32 } = require('mongodb');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
    username: String,
    password: String,
    cardCollection : Array,
    packs :  { type: Number, default: 0 }
}),
user = mongoose.model('user', userSchema);

module.exports = user;