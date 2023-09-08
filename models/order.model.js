const mongoose = require("mongoose");
const { bookSchema } = require("./book.model");

const orderSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    orderItems: {
      type: [
        {
          _id: false,
          books: bookSchema,
          quantity: Number,
          date: { type: Date, default: Date.now },
        }
      ],
    },
    totalPrice:{
      type:Number
    }
  },

);

const Orders = mongoose.model("Order", orderSchema);

module.exports.Orders = Orders;
