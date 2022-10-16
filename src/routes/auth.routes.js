const express = require("express");
const router = express.Router();
const {
  login,
  register,
  getUserBankAccounts,
} = require("../controllers/user.controller");
// const customHeader = require("../middlewares/customHeader");
const { validatorRegister, validatorLogin } = require("../validators/user");
router.post("/login", validatorLogin, login);
router.post("/register", validatorRegister, register);
router.get("/:id/bank-accounts", getUserBankAccounts);

module.exports = router;