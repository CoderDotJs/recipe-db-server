const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((v) => {
      console.log("Connected to MongoDB", v.connection.host);
    });
};

exports.connectDb = connectDb;
