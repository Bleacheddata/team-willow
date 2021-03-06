var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//user schema 
userSchema = new Schema( {
    username: String,
    password: String,
    cardCollection : Array,
    packs :  { type: Number, default: 3 },
    gold :  { type: Number, default: 300 }
}),
user = mongoose.model('user', userSchema);

module.exports = user;