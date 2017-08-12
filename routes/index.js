const express = require('../node_modules/express')
const router = express.Router()
const data = require('../data.json')
/*引入短信验证*/
const sms_util = require('../tools/sms_util')
/*引入数据库*/
const cjsj = require('../tools/users')
let city = '北京'
router.get('/api/selectCity', (req, res) => {
  city = req.query.city
  console.log(city)
})

/*加载首页*/
router.get('/', (req, res) =>{

  res.render('index.ejs', {fist:'active',load:'',serv:'',shop:'',about:'', city:city});

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
  res.render('loadApp.ejs',{fist:'',load:'active',serv:'',shop:'',about:'', city:city})
})
/*service*/
router.get('/servicer', (req,res)=>{
  res.render('servicer.ejs',{fist:'',load:'',serv:'active',shop:'',about:'', city:city})
})
/*shops*/
router.get('/shops', (req, res) => {
  res.render('shops.ejs', {fist:'',load:'',serv:'',shop:'active',about:'', city:city})
})
/*aboutus*/
router.get('/aboutus', (req, res) => {
  res.render('aboutus.ejs',{fist:'',load:'',serv:'',shop:'',about:'active', city:city})
})
/*toggolcity*/
router.get('/toggolcity', (req, res) => {
  res.render('toggolcity.ejs',{fist:'active',load:'',serv:'',shop:'',about:'', city:city})
})
/*忘记密码*/
router.get('/forgetpsw', (req, res) => {
  res.render('forgetpsw.ejs', {msg:''})
})
/*更多服务*/
let service = null
router.get('/users/api/moreser', function (req, res) {
  let id = req.query.id
  service = data.service.find((item, index) => {
    return item.serviceId == id
  })
  console.log(service)

  res.render('moreservice.ejs', {fist:'',load:'',serv:'',shop:'',about:'active', city:city, service})



})
/*详情*/
router.get('/users/api/detail', (req, res) => {
  let detailId = req.query.detailId
  const good = service.goods.find((item, index) => {
    return item.detailId == detailId
  })
  res.render('detail.ejs', {fist:'',load:'',serv:'',shop:'',about:'active', city:city, good})
})
/*服务商详情*/
router.get('/api/serdetail', (req, res) => {
  let serdetailId = req.query.serdetailId
  let service = data.service.find((item, index) => {
    return item.serviceId == serdetailId
  })
  res.render('serdetail.ejs',{fist:'',load:'',serv:'',shop:'',about:'active', city:city, service} )
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
/*忘记密码请求*/
router.post('/api/forgetpsw', (req, res) => {
  let phone = req.body.number.trim()
  let code2 = req.body.code.trim()
  let psw = req.body.psw.trim()
  if (code2 !== code){
    res.render('forgetpsw.ejs', {msg:'手机验证码错误！'})
  }
  if (!psw || !phone){
    res.render('forgetpsw.ejs',{msg:'请正确输入！！'})
  }else {
    cjsj.updateOne({phone}, {
     $set : { password : psw}
    },(err)=>{
      if (!err) {
        res.render('login.ejs', {msg:'修改成功，请登录！'})
      }else {
        res.render('forgetpsw.ejs', {msg:'修改失败！'})
      }
    })
  }

})
module.exports = router