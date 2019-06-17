const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * Defining author schema
 */
const authorSchema = new Schema({
  name: String,
  age: Number,
});

/**
 * Creating a Author model
 */
const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
