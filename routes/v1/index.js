const express = require("express");
const authRoute = require("./auth.route");
const bookRoute = require("./book.route")
const cartRoute = require("./cart.route")
const router = express.Router();

//route for registering and log in
router.use("/auth", authRoute);

//route for storing book and updating
router.use("/books",bookRoute)

//route for cart and checkout
router.use("/cart",cartRoute)

module.exports = router;
