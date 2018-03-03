const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
  name: String,
  pic_path: String,
  pic_name: String,
});

const familySchema = new Schema({
  username: String,
  password: String,
  role: String,
  name: String,
  lastName: String,
  gender: String,
  birthdate: Date,
  email: String,
  phone: String,
  address: String,
  avatar: pictureSchema,
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const Family = mongoose.model('Family', familySchema);

module.exports = Family;
