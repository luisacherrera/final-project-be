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

// router.post('/search', (req, res, next) => {
//   const findInterest = req.body.findInterest;
//   User.find({interests: { '$regex': findInterest, '$options': 'i' }})
//     .then(match => {
//       if (match.length > 0) {
//         return res.json(match);
//       } else {
//         return res.status(404).json(new Error('404'));
//       }
//     });
// });

module.exports = router;
