const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      trim: true,
    },
    stock:{
        type: Number
    },
    active: {
      type: Boolean,
      default: true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("product", productSchema);