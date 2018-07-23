const mongoose = require('mongoose')

const catSchema = new mongoose.Schema({
  photo: String,
  name: String,
  age: Number,
  breed: String,
  goodWithKids: Boolean,
  goodWithPets: Boolean,
  highEnergy: Boolean
})

module.exports = mongoose.model('Cat', catSchema)