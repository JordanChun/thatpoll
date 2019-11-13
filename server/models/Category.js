const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  date: { type: Date, default: new Date() },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Category', categorySchema);