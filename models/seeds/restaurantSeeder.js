const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')

db.once('open', () => {
    console.log('mongodb connected!')
    //loading JSON file
    const restList = require('../../restaurant.json')
    restList.results.forEach( restaurant => {
        Restaurant.create({
            id: restaurant.id,
            name : restaurant.name,
            name_en : restaurant.name_en,
            category : restaurant.category,
            image: restaurant.image,
            location: restaurant.location,
            phone: restaurant.phone,
            google_map: restaurant.google_map,
            rating: restaurant.rating,
            description: restaurant.description
        })
    })

}) 
