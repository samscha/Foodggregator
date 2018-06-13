const mongoose = require('mongoose');
const Googleplace = require('./googleplace');
const Yelp = require('./yelp');

const { ObjectId } = mongoose.Schema.Types;

const PlaceSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  intlPhone: {
    type: String,
  },
  googleplace: {
    type: ObjectId,
    ref: 'Googleplace',
  },
  yelp: {
    type: ObjectId,
    ref: 'Yelp',
  },
});

module.exports = mongoose.model('Place', PlaceSchema);
