const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  Photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  CheckOut: Number,
  maxGuests: Number
});


const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;