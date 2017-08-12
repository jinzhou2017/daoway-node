const express = require('../node_modules/express')
const router = express.Router()
const data = require('../data.json')
/*首页内容*/
router.get('/api/firstPage', (req, res) =>{

  res.send(data)

});


module.exports = router