const mongoose = require("mongoose");

const { MONGO_URL } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGO_URL)
    .then(console.log(`DB connected`))
    .catch((error) => {
      console.log(`DB connection failed`);
      console.log(error);
    });
};
