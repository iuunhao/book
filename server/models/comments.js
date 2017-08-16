var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
    name: String,
    avatar: String,
    ip: String,
    address: String,
    message: String,
    createDate: Date,
    floor: Number,
    image: String,
    accessory: String,
    isShow: Boolean,
    client: String,
    isAdmin: Boolean,
    reply: {
        message: String,
        createDate: Date,
        avatar: String,
        name: String,
        image: String,
        accessory: String
    }
});

module.exports = mongoose.model('Comment', CommentsSchema);
