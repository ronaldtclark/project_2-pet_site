const express = require('express')
const router = express.Router()
const Cat = require('../models/cats')
const User = require('../models/users')

// INDEX
router.get('/', async (req, res) => {
  try {
    const foundCats = await cat.find({})
    res.render('/cats/index.ejs')
  } catch (err) {
    console.log(err)
  }
})

// NEW
router.get('/new', async (req, res) => {
  try {
    const allCats = await cat.find({})
    res.render('/cats/new.ejs', {cats: allcats})
  } catch (err) {
    res.send(err)
  }
}) 

// SHOW
router.get(':/id', async (req, res) => {
  try{
    const foundCat = await cat.findById(req.params.id)
    const foundUser = await User.findOne({"cats._id": req.params.id})
    res.render('cats/show.ejs', {cat: foundcat, user:foundUser})
  } catch (err) {
    res.send(err)
  }

})

module.exports = router;