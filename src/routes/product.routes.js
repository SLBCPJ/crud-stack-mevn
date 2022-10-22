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
const auth = require("../middlewares/session");
const rol = require("../middlewares/rol");
router.post("/", auth, rol(['admin']), validatorCreate, createItem);
router.get("/products", auth, getItems);
router.get("/:id", getItem);
router.delete("/:id", auth, rol(['admin']), deleteItem);
router.put("/:id", validatorUpdate, updateItem);

module.exports = router;
