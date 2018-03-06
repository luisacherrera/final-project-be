'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
  name: String,
  username: String,
  password: String,
  description: {
    type: String,
    default: ' '
  },
  interests: Array,
  profilepic: {
    type: String,
    default: 'https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png'
  },
  messages: [{
    owner: {
      type: ObjectId,
      ref: 'User'
    },
    message: String
  }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
