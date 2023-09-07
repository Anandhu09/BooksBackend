const Book = require("../models").Book;
const httpStatus = require("http-status");
const bookService = require("../services/book.service");



const getBookByID = async (req, res) =>{
  const book = await bookService.getBookByID(req, res)
  res.status(httpStatus.OK).send(book)
}

const getAll = async (req, res) => {
  const books = await bookService.getBooks();
  res.status(httpStatus.OK).json({ books });
};

const search = async (req, res) => {
  const searchBook = await bookService.searchBook(req, res);
  res.status(httpStatus.OK).json(searchBook);
};

const addBook = async (req, res) => {
  
  const AddedBook = await bookService.AddBook(req, res);
  res.status(httpStatus.CREATED).json(AddedBook);
};

module.exports = { getAll, search, addBook,getBookByID };
