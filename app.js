const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLauout: 'main'}))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('view')
})

app.listen(port, () => {
    console.log(`express is listening on localhost:${port}`)
})

// setting static files
app.use(express.static('public'))