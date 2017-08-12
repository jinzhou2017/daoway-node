const express = require('../node_modules/express')
const router = express.Router()
const data = require('../data.json')
/*首页内容*/
router.get('/api/firstPage', (req, res) =>{

  res.send(data)

});
let id = null
router.get('/api/moreser', (req, res, next) => {
  id = req.query.id
  if (id){
    res.render('moreservice.ejs')
  }else {
    next()
  }
}, (req, res) => {
  const service = data.service.filter((item, index) => {
    return item.serviceId === id
  })
  res.send(service)
})
let detailId = null
router.get('/api/detail', (req, res, next) => {
  detailId = req.query.detailId
  if (detailId){
    res.render('detail.ejs')
  }else {
    next()
  }
}, (req, res) => {
  const service = data.service.filter((item, index) => {
    return item.serviceId === id
  })
  const goods = service[0].filter((item, index) => {
    return item.detailId === detailId
  })
  res.send(goods)
})

module.exports = router