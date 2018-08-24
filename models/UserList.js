//数据的模型 实际的增删改查都是经过这里处理的
var  mongoose = require('mongoose');
var userSchema = require('../schemas/User');
var userModel = mongoose.model('User',userSchema);
module.exports = userModel;
