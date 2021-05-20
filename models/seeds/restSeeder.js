const mongoose = require('mongoose')
const Rest = require('../rest')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection //check connection
db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb connected!')
    //loading JSON file
    const restList = require('../../public/restaurant.json')
    //console.log(restList.results)
    restList.results.forEach( rest => {
        Rest.create({
            id: rest.id,
            name : rest.name,
            name_en : rest.name_en,
            category : rest.category,
            image: rest.image,
            location: rest.location,
            phone: rest.phone,
            google_map: rest.google_map,
            rating: rest.rating,
            description: rest.description
        })
    })

}) 
