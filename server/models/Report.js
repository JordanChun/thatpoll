const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  ip: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true
  },
  urlRef: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Report', reportSchema);