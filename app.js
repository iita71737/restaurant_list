// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require handlebars in the project
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLauout: 'main'}))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

//routes setting
app.get('/', (req, res) => {
    res.render('view')
})

// start and listen on the Express server
app.listen(port, () => {
    console.log(`express is listening on localhost:${port}`)
})

