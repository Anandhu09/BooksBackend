const mongoose = require("mongoose");
const allowedGenres = [
  "Fiction",
  "Non-fiction",
  "Mystery",
  "Thriller",
  "Fantasy",
  "Science Fiction",
  "Romance",
  "Horror",
  "Biography",
  "History",
  "Self-Help",
];
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 255,
  },
  author: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  genre: {
    type: String,
    required: true,
    enum: allowedGenres,
    minlength: 2,
    maxlength: 100,
    validate: {
      validator: (value) => {
        return allowedGenres.includes(value);
      },
      message: `Invalid genre , Genres should be any of these ${allowedGenres}`,
    },
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  availability: {
    type: Boolean,
    default: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports.Book = Book;
module.exports.bookSchema = bookSchema;
