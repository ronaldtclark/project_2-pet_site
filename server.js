const express = require ('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const bcrypt = require('bcrypt')
const PORT = 5000

require('./db/db')

//MIDDLEWARE
app.use(session({
  secret: 'j39284jh34',
  resave: false,
  saveUninitialized: false
}))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended: false}))

//CONTROLLER ROUTES
const userController = require('./controllers/userController')
const petController = require('./controllers/petController')
const authController = require('./controllers/authController')

//SET UP CONTROLLER ROUTES
app.use('/users', userController)
app.use('/pets', petController)
app.use('/auth', authController)

app.get('/', (req, res) => {
  res.render('index.ejs')
})

//LISTENER
app.listen(PORT, () => {
  console.log('app listening on port', PORT)
})