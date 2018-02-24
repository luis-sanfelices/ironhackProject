const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personalInformation = new Schema({
  name: String,
  lastName: String,
  gender: Number,
  birthdate: Date,
  email: String,
  phone: String,
  address: String,
});

const familySchema = new Schema({
  username: String,
  password: String,
  personalInformation: [personalInformation],
  role: String,
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const Family = mongoose.model('Family', familySchema);

module.exports = Family;
