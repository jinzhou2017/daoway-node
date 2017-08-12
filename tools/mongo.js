const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/daowei')
mongoose.connection.once('open', (err)=>{
  if (!err){
    console.log('数据库已经连接！')
  }
})
