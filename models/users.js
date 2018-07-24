

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String, 
  age: Number,
  // maritalStatus: String,
  // children: String,
  // childrenAges: String,
  // yard: String,
  // otherPets: String
})

module.exports = mongoose.model('User', userSchema)
