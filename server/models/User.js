const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  ip: { 
    type: String,
    required: true,
    unique: true
  },
  createdPolls: [],
});

module.exports = mongoose.model('User', userSchema);