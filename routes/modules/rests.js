const express = require('express')
const router = express.Router()

const Rest = require('../../models/rest')

router.post('/', (req, res) => {
  const data = req.body
  const imgurl = '/public/image/restlist/' 
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
    .then((rest) => res.render('show', { rest }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, isCheck } = req.body
  Rest.findById(id)
    .lean()
    .then((rest) => res.render('edit', { rest }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const data = req.body
  console.log(req.body) 
  Rest.findById(id)
    .then(rest => {
        rest.name = data.name,
        rest.name_en = data.name_en,
        rest.category = data.category,
        rest.image = data.image,
        rest.location = data.location,
        rest.phone = data.phone,
        rest.google_map = data.google_map,
        rest.rating = data.rating,
        rest.description = data.description   
      return rest.save()
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