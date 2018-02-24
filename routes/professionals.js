const express = require('express');
const Professional = require('../models/professional');

const router = express.Router();

router.get('/', (req, res, next) => {
  Professional.find({}, (err, professionals) => {
    if (err) { return next(err); }

    res.render('professionals/list', {
      professionals: professionals
    });
  });
});

module.exports = router;
