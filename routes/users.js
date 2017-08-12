const express = require('../node_modules/express')
const router = express.Router()
const data = require('../data.json')
/*首页内容*/
router.get('/api/firstPage', (req, res) =>{

  res.send(data)

});
let service = null
router.get('/api/moreser', function (req, res) {
  let id = req.query.id
  service = data.service.find((item, index) => {
    return item.serviceId == id
  })
  console.log(service)

  res.render('moreservice.ejs', service)



})

router.get('/api/detail', (req, res) => {
  let detailId = req.query.detailId
  const good = service.goods.find((item, index) => {
    return item.detailId == detailId
  })
  res.render('detail.ejs', good)
})

module.exports = router