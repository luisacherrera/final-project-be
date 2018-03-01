'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  interests: Array,
  profilepic: {
    type: String,
    default: 'https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png'
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
