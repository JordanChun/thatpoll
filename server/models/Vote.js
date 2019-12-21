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
  },
  votedAt: {
    type: Date,
    default: Date.now
  },
  cid: {
    type: String
  }
});

module.exports = mongoose.model('Vote', voteSchema);