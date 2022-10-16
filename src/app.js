require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dbConnect = require("./config/db");
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use("/api", require("./routes"));
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listen on PORT:${port}`);
});

dbConnect();