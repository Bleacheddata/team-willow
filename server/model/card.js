var mongoose = require('mongoose');
var Schema = mongoose.Schema;

cardSchema = new Schema( {
  rarity: String
}),
card = mongoose.model('card', cardSchema);

module.exports = card;