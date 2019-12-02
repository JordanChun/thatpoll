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
});

module.exports = mongoose.model('Visit', visitSchema);