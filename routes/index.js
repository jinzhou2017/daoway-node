const express = require('../node_modules/express')
const router = express.Router()
/*引入短信验证*/
const sms_util = require('../tools/sms_util')
/*引入数据库*/
const cjsj = require('../tools/users')

/*加载首页*/
router.get('/', (req, res) =>{

  res.render('index.ejs');

});
/*初始化*/
router.get('/login', (req, res) => {
  res.render('login.ejs', {msg:''})
})
router.get('/regist', (req, res) => {
  res.render('regist.ejs', {msg:''})
})
/*loadApp*/
router.get('/loadApp', (req, res) => {
  res.render('loadApp.ejs')
})
/*service*/
router.get('/servicer', (req,res)=>{
  res.render('servicer.ejs')
})
/*shops*/
router.get('/shops', (req, res) => {
  res.render('shops.ejs')
})
/*aboutus*/
router.get('/aboutus', (req, res) => {
  res.render('aboutus.ejs')
})
/*处理验证码请求*/
let code = null
router.get('/api/msgCheck', (req, res)=>{
  let number = req.query.number
  code = sms_util.randomCode(4)
  sms_util.sendCode(number,code, function (success) {
    console.log(success);
  })
})
/*注册请求*/
router.post('/api/regist', (req, res) => {
  let phone = req.body.number.trim()
  let code2 = req.body.code.trim()
  let psw = req.body.psw.trim()
  if (code2 !== code){
    res.render('regist.ejs', {msg:'手机验证码错误！'})
  }
  if (!psw || !phone){
    res.render('regist.ejs',{msg:'请正确输入！！'})
  }else {
    console.log(1111)
    cjsj.create({
      phone,
      password: psw
    },(err)=>{
      if(!err){
        res.render('login.ejs',{msg: '注册成功请登录'})
      }else {
        res.render('regist.ejs',{msg:'该用户已存在！'})
      }
    })
  }

})
/*登录请求*/
router.post('/api/login', (req, res) => {
  let phone = req.body.phone
  let password = req.body.password
  cjsj.findOne({phone:phone}, (err, user)=>{
    if (!err && user && user.password === password){
      res.redirect('/')
    }else {
      res.render('login', {msg:'用户名或密码错误！'})
    }
  })
})
module.exports = router