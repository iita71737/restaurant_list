const express = require('express')
const router = express.Router()
const Rest = require('../../models/rest')

//routes setting
router.get('/', (req, res) => {
   //res.render('view', { restlist : restaurantList.results})
    Rest.find()
    .lean()
    .sort({ _id: 'desc' })
    .then( restlist => res.render('view', { restlist } ))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
    const keyword = req.query.keyword
    Rest.find( {name :new RegExp(keyword, 'i')} , function (err,docs) { 
    })
    .lean()
    .then( restlist => res.render('view', { restlist } ))
    .catch(error => console.error(error))
})


// 匯出路由模組
module.exports = router