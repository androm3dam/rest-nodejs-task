const { Schema, model } = require('mongoose');

const schema = new Schema({
  _id: {
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  password: { type: String, required: true },
});

module.exports = model('User', schema);
