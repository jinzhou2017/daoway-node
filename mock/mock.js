const Mock = require('mockjs')
const data = require('./data.json')
Mock.mock('api/firstPage', {
    code: 0,
    data: data.firstPage
})
