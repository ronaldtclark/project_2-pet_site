<<<<<<< HEAD

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
=======
const mongoose = require('mongoose')

const userSchema = new momngoose.Schema({
>>>>>>> 20ef7db4ec26b6a3ae39cd0769dbee0cc9bb030a
  username: String,
  password: String,
  name: String, 
  age: Number,
  maritalStatus: Boolean,
  children: Boolean,
  childrenAges: String,
  yard: Boolean,
  otherPets: Boolean
})

module.exports = mongoose.model('User', userSchema)