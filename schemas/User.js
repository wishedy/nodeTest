var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    age:Number,
    sex:String,
    name:String,
    id:Number
});
module.exports = userSchema;