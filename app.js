const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const methodOverride = require('method-override')
const routes = require('./routes')
const app = express()
const port = 3000


const exphbs = require('express-handlebars')

const Handlebars = require('handlebars');
const H = require('just-handlebars-helpers')
H.registerHelpers(Handlebars)

require('./config/mongoose')

app.use(session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
}))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', exphbs({ defaultLauout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))
app.use(methodOverride('_method'))

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)
app.use((req, res, next) => {
    // 你可以在這裡 console.log(req.user) 等資訊來觀察
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    next()
})
app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
    console.log(`express is listening on localhost:${port}`)
})

