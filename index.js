const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();
let server;
const port = process.env.PORT;
const url = process.env.URL;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(url, options)
  .then(() => {
    console.log("Connected to database", url);
    server = app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
