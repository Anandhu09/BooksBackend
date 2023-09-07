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
    orders: [
      {
        books: [
          {
            books: bookSchema,
            quantity: Number,
          },
        ],
        total: Number,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: false,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports.Cart = Cart;
