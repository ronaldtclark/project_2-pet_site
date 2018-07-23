const mongoose = require('mongoose')

const userSchema = new momngoose.Schema({
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