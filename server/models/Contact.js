const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  ip: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Contact', contactSchema);