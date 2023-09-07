const Book = require("../models/").Book;
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const getBookByID = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    return book;
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message:error.message})
  }
};

const getBooks = async () => {
  try {
    const books = await Book.find({});
    return books;
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message:error.message})
  }
};

const searchBook = async (req, res) => {
  try {
    if (req.query.title) {
      const books = await Book.find({
        title: { $regex: req.query.title, $options: "i" },
      });
      return books;
    }
    if (req.query.author) {
      const books = await Book.find({
        author: { $regex: req.query.author, $options: "i" },
      });
      return books;
    }
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Add the url parameters such as author or title"
    );
  } catch (error) {
    if (error.statusCode == 400)
      res.status(error.statusCode).json({ message: error.message });
    else {
      res.status(500).json({ message: error.message });
    }
  }
};
const AddBook = async (req, res) => {
  const { title, author, genre, price, availability } = req.body;
  try {
    const book = await Book.create({
      title,
      author,
      genre,
      price,
      availability,
    });
    return book;
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = { getBooks, searchBook, AddBook, getBookByID };
