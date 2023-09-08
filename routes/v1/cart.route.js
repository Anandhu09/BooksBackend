const express = require("express");
const validate = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const cartValidation = require("../../validations/cart.validation");
const  cartController  = require("../../controllers/cart.controller");

const router = express.Router();

//route for get all the cartitems
router.get("/", auth, cartController.getCart);

//route for add a book to the cart
router.post(
  "/",
  auth,
  validate(cartValidation.addProductToCart),
  cartController.addProductToCart
);

//route for update a cart
router.put(
  "/",
  auth,
  validate(cartValidation.addProductToCart),
  cartController.updateProductInCart
);

//route for checkout the cartItems
router.put(
  "/checkout",auth,
  cartController.checkout
);



module.exports = router;