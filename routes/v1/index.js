const express = require("express");
const authRoute = require("./auth.route");
const bookRoute = require("./book.route")
const cartRoute = require("./cart.route")
const router = express.Router();

router.use("/auth", authRoute);
router.use("/books",bookRoute)
router.use("/cart",cartRoute)

module.exports = router;
