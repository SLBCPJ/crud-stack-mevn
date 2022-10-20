const express = require("express");
const router = express.Router();
const {
  createItem,
  getItem,
  getItems,
  deleteItem,
  updateItem,
} = require("../controllers/product.controller");
const { validatorCreate, validatorUpdate } = require("../validators/product");
router.post("/create-product", validatorCreate, createItem);
router.get("/products", getItems);
router.get("/:id", getItem);
router.delete("/:id", deleteItem);
router.put("/:id", validatorUpdate, updateItem );

module.exports = router;
