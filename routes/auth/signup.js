const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log('holita');
});

router.get('/family', (req, res, next) => {
  res.render('auth/signup_family');
});

module.exports = router;
