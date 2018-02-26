const mongoose = require('mongoose');
const Googleplace = require('./googleplace');
const Yelp = require('./yelp');

const { ObjectId } = mongoose.Schema.Types;

const PlaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  address: {
    type: String,
    required: true,
    index: true,
  },
  intlPhone: {
    type: Number,
    index: true,
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
