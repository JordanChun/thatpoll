const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  vote: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Vote', voteSchema);