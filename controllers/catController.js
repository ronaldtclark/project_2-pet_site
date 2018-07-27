const express = require('express')
const router = express.Router()
const Cat = require('../models/cats')
const User = require('../models/users')

// INDEX
router.get('/', async (req, res) => {
  try {
    const foundCats = await Cat.find({})
    res.render('cats/index.ejs', {
      cats: foundCats,
      userId: req.session.id
    })
  } catch (err) {
    console.log(err)
  }
})

// NEW
router.get('/new', (req, res) => {
  res.render('cats/new.ejs', {
      userId: req.session.id
    })
}) 


// CREATE
router.post('/', async (req, res) => {
  if(req.body.goodWithKids === 'on') {
    req.body.goodWithKids = true
  } else {
    req.body.goodWithKids = false
  }
  if(req.body.goodWithPets === 'on') {
    req.body.goodWithPets = true
  } else {
    req.body.goodWithPets = false
  }
  if(req.body.highEnergy === 'on') {
    req.body.highEnergy = true
  } else {
    req.body.highEnergy = false
  }
  try {
    const createdCat = await Cat.create(req.body)
    res.redirect('/cats')
  } catch (err) {
    res.send(err)
  }
})

// SHOW
router.get('/:id', async (req, res) => {
  try {
    const foundCat = await Cat.findById(req.params.id)
    res.render('cats/show.ejs', {
      cat: foundCat,
      userId: req.session.id
    })
  } catch (err) {
    res.send(err)
  }
})

// EDIT
router.get('/:id/edit', async (req, res) => {
  try {
    const foundCat = await Cat.findById(req.params.id)
    res.render('cats/edit.ejs', {
      cat: foundCat,
      userId: req.session.id
    })
  } catch (err) {
    res.send (err)
  }
})

// UPDATE
router.put('/:id', async (req, res) => {
  if(req.body.goodWithKids === 'on') {
    req.body.goodWithKids = true
  } else {
    req.body.goodWithKids = false
  }
  if(req.body.goodWithPets === 'on') {
    req.body.goodWithPets = true
  } else {
    req.body.goodWithPets = false
  }
  if(req.body.highEnergy === 'on') {
    req.body.highEnergy = true
  } else {
    req.body.highEnergy = false
  }
  try {
    const updatedCat = await Cat.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.redirect('/cats')
  } catch (err) {
    res.send (err)
  }
})

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deletedCat = await Cat.findByIdAndRemove(req.params.id)
    res.redirect('/cats')
  } catch (err) {
    res.send (err)
  }
})




module.exports = router;
