const express = require('express')
const routes = require('./routes')
const app = express()
const port = 3000
// require handlebars in the project
const exphbs = require('express-handlebars')

const Handlebars = require('handlebars');
const H = require('just-handlebars-helpers')
H.registerHelpers(Handlebars)
//require json file in the project
//const restaurantList = require('./restaurant.json')
const Rest = require('./models/rest')

require('./config/mongoose')


// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', exphbs({ defaultLauout: 'main'}))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
    console.log(`express is listening on localhost:${port}`)
})

