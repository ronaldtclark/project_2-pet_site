const express = require ('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const bcrypt = require('bcrypt')

const port = process.env.port || 3000;


require('./db/db')

//MIDDLEWARE
app.use(session({
  secret: 'j39284jh34',
  resave: false,
  saveUninitialized: false
}))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'))

//CONTROLLER ROUTES
const userController = require('./controllers/userController')
const catController = require('./controllers/catController')
const dogController = require('./controllers/dogController')
const authController = require('./controllers/authController')

//SET UP CONTROLLER ROUTES
app.use('/users', userController)
app.use('/cats', catController)
app.use('/dogs', dogController)
app.use('/auth', authController)

app.get('/', (req, res) => {
  res.render('index.ejs', {
    userId: req.session.id
  })
})

//LISTENER
app.listen(port, () => {
  console.log('app listening on port', PORT)
})