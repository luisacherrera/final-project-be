'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', (req, res, next) => {
  User.find({})
    .then((user) => res.json(user))
    .catch(next);
});

module.exports = router;
