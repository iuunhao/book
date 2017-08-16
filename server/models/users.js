var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userName: String,
  pwd: String
});

module.exports = mongoose.model('User', UserSchema);
