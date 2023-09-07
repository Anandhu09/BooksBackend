const Book = require("../models").Book
const httpStatus = require("http-status");
const bookService = require("../services/book.service")
const getAll = async (req, res) => {
    const books = await bookService.getBooks()
    res.status(httpStatus.OK).json({books})
};

const search = async (req, res) => {

  const searchBook = await bookService.searchBook(req,res)
  res.status(httpStatus.OK).json(searchBook);
 
};

const addBook = async (req, res) => {
  const { title, author, genre, price, availability } = req.body;
  try {
    const book = await Book.create({
      title,
      author,
      genre,
      price,
      availability,
    });

    res.status(201).json(book);
  } catch (error) {
    console.log(error, "HEHE");
    if (error.name === "ValidationError") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = { getAll, search, addBook };
