const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  _id: String,
  user: { type: String, required: true },
});

module.exports = model('Token', schema);
