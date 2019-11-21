const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: new Date() },
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
    required: true,
    default: 6
  },
  results: [],
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  category: {
    type: String,
    required: true,
    default: 'Other'
  },
  visits: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model('Poll', pollSchema);