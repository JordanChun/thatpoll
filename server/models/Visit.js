const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  lastVisited: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('Visit', visitSchema);