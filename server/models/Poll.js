const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: Date.now },
  creatorIp: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  choices: [],
  visibility: {
    type: String,
    required: true,
    default: 'public'
  },
  totalVotes: {
    type: Number,
    required: true,
    default: 0,
  },
  votingPeriod: {
    type: Number,
    require: true,
    default: 6
  },
  results: [0, 0, 0, 0],
});

module.exports = mongoose.model('Poll', pollSchema);