const express = require('express')
const router = express.Router()

const Rest = require('../../models/rest')

router.post('/', (req, res) => {
  const data = req.body
  
  console.log(req.body) 
    Rest.create({ 
        name:data.name,
        name_en:data.name_en,
        category:data.category,
        image:data.image,
        location:data.location,
        phone:data.phone,
        google_map:data.google_map,
        rating:data.rating,
        description: data.description
    })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  Rest.findById(id)
    .lean()
    .then(( restaurant ) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, isCheck } = req.body
  Rest.findById(id)
    .lean()
    .then(( restaurant ) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const data = req.body
  console.log(req.body) 
  Rest.findById(id)
    .then(restaurant => {
        restaurant.name = data.name,
        restaurant.name_en = data.name_en,
        restaurant.category = data.category,
        restaurant.image = data.image,
        restaurant.location = data.location,
        restaurant.phone = data.phone,
        restaurant.google_map = data.google_map,
        restaurant.rating = data.rating,
        restaurant.description = data.description   
      return restaurant.save()
    })
    .then(()=> res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})


router.delete('/:id', (req, res) => {
  const id = req.params.id
  Rest.findById(id)
    .then(rest => rest.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router