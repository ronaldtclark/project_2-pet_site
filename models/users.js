

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String, 
  age: Number,
  maritalStatus: Boolean,
  children: Boolean,
  childrenAges: String,
  yard: Boolean,
  otherPets: Boolean
})

module.exports = mongoose.model('User', userSchema)
