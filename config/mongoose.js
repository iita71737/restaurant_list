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
module.exports = db