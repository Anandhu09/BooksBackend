const express = require("express");
const bookController = require("../../controllers/book.controller");
const router = express.Router();


// Get all books
router.get("/", bookController.getAll);

// Search books by title or author
router.get("/search", bookController.search);

// Create a new book
router.post("/", bookController.addBook);

//Get the book by its ID
router.get("/search/:id",bookController.getBookByID)

module.exports = router;
