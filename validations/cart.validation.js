const Joi = require("joi");
const { objectId } = require("./custom.validation");

const addProductToCart = {
  body: Joi.object().keys({
    bookId: Joi.string().required().custom(objectId),
    quantity: Joi.number().required(),
  }),
};

module.exports = {
  addProductToCart,
};