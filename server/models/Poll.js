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
  entries: {
    type: Array
  },
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
  },
  multiIp: {
    type: Boolean,
    required: true,
    default: false
  },
  multiChoice: {
    type: Boolean,
    required: true,
    default: false
  },
  maxSelectChoices: {
    type: Number,
    required: true,
    default: 2
  },
});

module.exports = mongoose.model('Poll', pollSchema);