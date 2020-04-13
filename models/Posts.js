const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String },
  category: { type: String, ref: 'Category', required: true }
});

module.exports = mongoose.model('Post', postSchema);
