const Joi = require("joi");
const { objectId } = require("./custom.validation");

const getBook = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const addBookToCart = {
  body: Joi.object().keys({
    productId: Joi.string().required().custom(objectId),
    quantity: Joi.number().required(),
  }),
};

module.exports = {
  getBook,addBookToCart
};