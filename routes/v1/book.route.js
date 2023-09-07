const express = require("express");
const bookController = require("../../controllers/book.controller");
const router = express.Router();



//Get the book by its ID
router.get("/:id",bookController.getBookByID)

// Get all books
router.get("/", bookController.getAll);

// Search books by title or author
router.get("/search", bookController.search);

// Create a new book
router.post("/", bookController.addBook);

module.exports = router;
