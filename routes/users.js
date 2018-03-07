'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/all/:id', (req, res, next) => {
  User.find({_id: {$ne: req.params.id}})
    .then((user) => res.json(user))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .populate('messages.owner')
    .exec((err, user) => {
      if (err) { return res.status(500).json(err); }
      if (!user) { return res.status(404).json(new Error('404')); }

      return res.json(user);
    });
});

router.post('/message/:id', (req, res, next) => {
  const userId = req.params.id;

  const messageData = {
    owner: req.session.currentUser._id,
    message: req.body.message
  };

  User.findByIdAndUpdate(userId, { $push: { messages: messageData } }, {new: true})
    .then((user) => res.json(user))
    .catch(next);
});

module.exports = router;
