const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  ip: { 
    type: String,
    required: true,
    unique: true
  },
  createdPolls: [],
  isEu: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model('User', userSchema);