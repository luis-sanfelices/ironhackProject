const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const Family = mongoose.model('Family', familySchema);

module.exports = Family;
