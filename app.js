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

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(express.urlencoded({ extended: true }))

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

// app.get('/restaurants/:id', (req, res) => {
//     const restaurant = restaurantList.results.find(rest => rest.id.toString() === req.params.id)
//     res.render('show', { rest :restaurant})
// })

// app.get('/search', (req, res) => {
//     const keyword = req.query.keyword
//     const rests = restaurantList.results.filter(rest => {
//         return rest.name.toLowerCase().includes(keyword.toLowerCase())
//     })
//     res.render('view', { restlist: rests,  keyword: keyword})
// })

app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    Rest.find( {name :new RegExp(keyword, 'i')} , function (err,docs) { 
    })
    .lean()
    .then( restlist => res.render('view', { restlist } ))
    .catch(error => console.error(error))
})

app.post('/rests', (req, res) => {
  const data = req.body
  const imgurl = '/public/image/restlist/' 
  console.log(req.body) 
    Rest.create({ 
        name:data.name,
        name_en:data.name_en,
        category:data.category,
        image: imgurl + data.image,
        location:data.location,
        phone:data.phone,
        google_map:data.google_map,
        rating:data.rating,
        description: data.description
    })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Rest.findById(id)
    .lean()
    .then((rest) => res.render('show', { rest }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Rest.findById(id)
    .lean()
    .then((rest) => res.render('edit', { rest }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const data = req.body
  Rest.findById(id)
    .then(rest => {
        rest.name = data.name,
        rest.name_en = data.name_en,
        //rest.category = data.category,
        //rest.image = imgurl + data.image,
        rest.location = data.location,
        rest.phone = data.phone,
        rest.google_map = data.google_map,
        //rest.rating = data.rating,
        rest.description = data.description   
      return rest.save()
    })
    .then(()=> res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})


app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  Rest.findById(id)
    .then(rest => rest.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// start and listen on the Express server
app.listen(port, () => {
    console.log(`express is listening on localhost:${port}`)
})

