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
    .exec((err, user) => {
      if (err) { return res.status(500).json(err); }
      if (!user) { return res.status(404).json(new Error('404')); }

      return res.json(user);
    });
});

router.post('/edit/:id', (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((result) => {
      let updateDescription = '';
      if (req.body.description === '') {
        updateDescription = result.description;
      } else {
        updateDescription = req.body.description;
      }

      const updateUser = {
        name: req.body.name,
        interests: req.body.interests,
        description: updateDescription
      };

      User.findByIdAndUpdate(userId, updateUser)
        .then((user) => {
          return res.json(user);
        }).catch(next);
    });
});

module.exports = router;
