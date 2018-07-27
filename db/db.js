const mongoose = require('mongoose');
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/pet_site'

// create our db and connect
mongoose.connect(mongoUri, {useNewUrlParser: true});

mongoose.connection.on('connected', () => {
  console.log('mongoose is connected');
});

mongoose.connection.on('error', (err) => {
  console.log(err, 'mongoose error');
});

mongoose.connection.on('disconnected', () => {
  console.log('mongoose is disconnected');
});
