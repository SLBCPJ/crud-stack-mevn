const mongoose = require("mongoose");

const dbConnect = () => {
  const DB_URI = process.env.DB_URI;
  const options = { useNewUrlParser: true, useUnifiedTopology: true };
  mongoose.connect(DB_URI, options, (err, res) => {
    if (!err) {
      console.log(
        `****connection to the db ${res.connection.name} successful****`
      );
    } else {
      console.log("**** ERROR CONNECT TO THE DB ****");
    }
  });
};

module.exports = dbConnect;