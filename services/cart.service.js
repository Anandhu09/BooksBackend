const httpStatus = require("http-status");
const { Cart, Book, Orders } = require("../models");
const ApiError = require("../utils/ApiError");
const { objectId } = require("../validations/custom.validation");

const getCartByUser = async (user) => {
  const cart = await Cart.findOne({ email: user.email });
  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not have a cart");
  }
  return cart;
};

const addProductToCart = async (user, bookId, quantity) => {
  let cart = await Cart.findOne({ email: user.email });

  if (!cart) {
    try {
      cart = await Cart.create({
        email: user.email,
        cartItems: [],
        totalPrice: 0,
      });
      await cart.save();
    } catch (e) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "User cart creation failed"
      );
    }
  }

  console.log(cart.cartItems, "Cart");

  if (cart.cartItems.some((item) => item.books._id == bookId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Book already in cart");
  }

  const product = await Book.findOne({ _id: bookId });

  if (!product) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Book doesn't exist in the database"
    );
  }

  cart.cartItems.push({ books: product, quantity });
  await cart.save();

  const total = cart.cartItems.reduce((acc, item) => {
    acc = acc + item.books.price * item.quantity;
    return acc;
  }, 0);

  cart.totalPrice = total;
  await cart.save();

  return cart;
};

const updateProductInCart = async (user, bookId, quantity) => {
  const cart = await Cart.findOne({ email: user.email });

  if (!cart) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User does not have a cart. Use POST to create cart and add a product"
    );
  }

  const product = await Book.findOne({ _id: bookId });

  if (!product) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Product doesn't exist in database"
    );
  }

  const productIndex = cart.cartItems.findIndex(
    (item) => item.books._id == bookId
  );

  if (productIndex === -1) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Product not in cart");
  }

  cart.cartItems[productIndex].quantity = quantity;

  const total = cart.cartItems.reduce((acc, item) => {
    acc = acc + item.books.price * item.quantity;
    return acc;
  }, 0);

  cart.totalPrice = total;
  await cart.save();

  return cart;
};

const deleteProductFromCart = async (user, bookId) => {
  const cart = await Cart.findOne({ email: user.email });
  if (!cart) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User does not have a cart");
  }
  const productIndex = cart.cartItems.findIndex(
    (item) => item.books._id == bookId
  );

  if (productIndex === -1) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Product not in cart");
  }

  cart.cartItems.splice(productIndex, 1);
  await cart.save();
};

const checkout = async (user) => {
  console.log("existing")
  try {
    const userCart = await Cart.findOne({ email:user.email });
    console.log(userCart,"IIEIEI")
    if (!userCart) {
      throw new ApiError(httpStatus.NOT_FOUND,"User does not have a cart");
    }

    if(!userCart.cartItems.length){
      throw new ApiError(httpStatus.NOT_FOUND, "User does not have items in the cart")
    }

    const existingOrder = await Orders.findOne({ email:user.email });
    console.log(existingOrder,"existing")
    if (existingOrder) {
      existingOrder.orderItems.push(...userCart.cartItems);
      existingOrder.totalPrice += userCart.totalPrice;
      await existingOrder.save();
    } else {
      const newOrder = new Orders({
        email: userCart.email,
        orderItems: userCart.cartItems,
        totalPrice: userCart.totalPrice,
      });
      await newOrder.save();
    }
    userCart.cartItems = [];
    userCart.totalPrice = 0;
    await userCart.save();

    return { success: true, message: "Checkout successful" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

module.exports = {
  getCartByUser,
  addProductToCart,
  updateProductInCart,
  deleteProductFromCart,
  checkout,
};
