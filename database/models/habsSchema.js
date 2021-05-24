const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  eName: String,
  eValue: Number,
});

module.exports = new mongoose.model('Habs', habitSchema, 'habits');