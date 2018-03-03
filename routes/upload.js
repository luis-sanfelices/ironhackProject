const express = require('express');
const multer = require('multer');
const router = express.Router();

const Family = require('../models/family');

const upload = multer({ dest: './public/uploads/' });

router.post('/family/:id', upload.single('photo'), (req, res) => {
  console.log(req);
  const pic = {
    name: req.body.name,
    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname,
  };
  const { id } = req.params;
  Family.findByIdAndUpdate(
    { _id: id }, {
      $set: { avatar: pic } },
    { new: true },
    (err, family) => console.log(err, family) // res.redirect('/profiles/professional')
  );
});

module.exports = router;
