const mongoose = require('mongoose')
const schema = new mongoose.Schema({

  phone:{
    type:Number,
    unique: true,
    index: 1
  } ,
  password: String,
});
//暴露模型
module.exports = mongoose.model('user', schema);