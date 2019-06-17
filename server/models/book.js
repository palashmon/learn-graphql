const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * Defining book schema
 *
 * Everything in Mongoose starts with a Schema.
 * Each schema maps to a MongoDB collection and defines the
 * shape of the documents within that collection.
 */
const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String,
});

/**
 * Creating a model
 *
 * To use our schema definition,
 * we need to convert our bookSchema into a Model we can work with.
 * To do so, we pass it into `mongoose.model(modelName, schema)`
 */
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
