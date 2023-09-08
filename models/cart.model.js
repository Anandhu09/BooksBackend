const mongoose = require("mongoose");
const { bookSchema } = require("./book.model");

const cartSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    cartItems: [
      {
        books: bookSchema,
        quantity: Number,
      },
    ],
    totalPrice:{
      type:Number,
      required:false
    }
  },
  {
    timestamps: false,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports.Cart = Cart;
