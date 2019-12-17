const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  ip: { 
    type: String,
    required: true,
    unique: true
  },
  createdPolls: [],
  pollLimitCounter: {
    type: Number,
    default: 0,
    required: true
  },
  lastCreated: {
    type: Date
  }
});

module.exports = mongoose.model('User', userSchema);