const httpStatus = require("http-status");

const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
  console.log(err, "HELLo");
  let { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...{ stack: err.stack },
  };

  res.status(statusCode).send(response);
};

module.exports = {
  errorHandler,
};
