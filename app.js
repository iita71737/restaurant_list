// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
// require handlebars in the project
const exphbs = require('express-handlebars')
//require json file in the project
//const restaurantList = require('./restaurant.json')
const Rest = require('./models/rest')
//require mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true }) // connect localhost mongodb

const db = mongoose.connection //check connection
db.on('error', () => {
    console.log('mongodb error!')
})//db error
db.once('open', () => {
    console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLauout: 'main'}))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

//routes setting
app.get('/', (req, res) => {
   //res.render('view', { restlist : restaurantList.results})
    Rest.find()
    .lean()
    .then( restlist => res.render('view', { restlist } ))
    .catch(error => console.error(error))
})

app.get('/restaurants/:id', (req, res) => {
    const restaurant = restaurantList.results.find(rest => rest.id.toString() === req.params.id)
    res.render('show', { rest :restaurant})
})

app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const rests = restaurantList.results.filter(rest => {
        return rest.name.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('view', { restlist: rests,  keyword: keyword})
})


// start and listen on the Express server
app.listen(port, () => {
    console.log(`express is listening on localhost:${port}`)
})

