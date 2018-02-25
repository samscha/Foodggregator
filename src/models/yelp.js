const mongoose = require('mongoose');

const YelpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  intlPhone: String,
  location: {
    lat: Number,
    lng: Number,
  },
  rating: Number,
  id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Yelp', YelpSchema);
