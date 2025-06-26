// server/models/User.js
const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  text: String,
  date: String,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,   
  entries: [EntrySchema]
});

module.exports = mongoose.model('User', UserSchema);
