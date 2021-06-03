const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//routes setting
router.get('/', (req, res) => {
    Restaurant.find()
    .lean()
    .sort({ _id: 'desc' })
    .then( restaurantList => res.render('index', { restaurantList } ))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
    const keyWord = req.query.keyword
    Restaurant.find( {name :new RegExp(keyWord, 'i')})
    .lean()
    .then( restaurantList => res.render('index', { restaurantList , keyWord} ))
    .catch(error => console.error(error))
})

router.get('/sort', (req, res) => {
    const sortObj = req.query.sort
    Restaurant.find()
    .lean()
    .sort(sortObj)
    .then( restaurantList => res.render('index', { restaurantList , sortObj} ))
    .catch(error => console.error(error))
})


// 匯出路由模組
module.exports = router