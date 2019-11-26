const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Feedback', feedbackSchema);