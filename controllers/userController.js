const express = require('express');
const router  = express.Router();
const User  = require('../models/users');
const Dog = require('../models/dogs');
const Cat = require('../models/cats')

//INDEX
router.get('/', async (req, res) => {
  try {
    const foundUser = await User.findById(req.session.userId)
    console.log(foundUser, 'this is found user')
    res.render('users/index.ejs', {
      users: foundUser,
      userId: req.session.userId
    })
  } catch (err) {
    console.log(err)
  }
})


//NEW
router.get('/new', (req, res) => {
  console.log(req.session.userId)

  res.render('users/new.ejs', {
    userId: req.session.userId
  });
})


//SHOW
router.get('/:id', async (req, res) => {
  try {
    const foundUser = await User.findById(req.session.userId)
    res.render('users/show.ejs', {
      user: foundUser,
      userId: req.session.userId
    })
  } catch (err) {
    res.send(err)
  }
})


//EDIT
router.get('/:id/edit', async (req, res) => {
  try {
    const foundUser = await User.findById(req.session.userId)
    res.render('users/edit.ejs', {
      user: foundUser, 
      userId: req.session.userId
    })
  } catch (err) {
    res.send(err)
  }
})


//UPDATE
router.put('/:id', async (req, res, next) => {

  try {

    // find the user obj corresponding to req.session.userId
    const foundUser = await User.findById(req.session.userId)
    console.log(foundUser)

    User.update(foundUser, req.body, (err, user) => {
      // console.log(foundUser)
      res.redirect('/users/:id')
    }) 
  }
  catch (err)  {
    next(err);
  }

})


//POST
// router.post('/', async (req, res) => {
//   try {
//     console.log(req.body, 'this is req.body')
//     console.log(req.session.userId, 'this is req.session.userId')
//     const createdUser = await User.findByIdAndUpdate(req.session.userId, req.body)
//     res.redirect('/')
//   } catch (err) {
//     res.send(err)
//   }
// })

// DELETE 
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id)
    res.redirect('/users')
  } catch (err) {
    res.send(err)
  }
})



module.exports = router;
