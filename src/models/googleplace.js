const mongoose = require('mongoose');

const GoogleplaceSchema = new mongoose.Schema({
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
  placeId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Googleplace', GoogleplaceSchema);
