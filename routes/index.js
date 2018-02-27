const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ welcome: 'MySports API' });
});

module.exports = router;
