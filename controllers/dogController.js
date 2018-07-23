const express = require('express')
const router = express.Router()
const Dog = require('../models/dogs')
const User = require('../models/users')

// INDEX
router.get('/', async (req, res) => {
  try {
    const foundDogs = await Dog.find({})
    res.render('/dogs/index.ejs')
  } catch (err) {
    console.log(err)
  }
})

// NEW
router.get('/new', async (req, res) => {
  try {
    const allDogs = await Dog.find({})
    res.render('/dogs/new.ejs', {dogs: allDogs})
  } catch (err) {
    res.sedn(err)
  }
}) 

// SHOW
router.get(':/id', async (req, res) => {
  try{
    const foundDog = await Dog.findById(req.params.id)
    const foundUser = await User.findOne({"dogs._id": req.params.id})
    res.render('dogs/show.ejs', {dog: foundDog, user:foundUser})
  } catch (err) {
    res.send(err)
  }
})

module.exports = router;