const express = require("express");
const router = express.Router();
const {login,register} = require('../controllers/auth.controller');
const { validatorRegister, validatorLogin } = require("../validators/user");
router.post("/login", validatorLogin, login);
router.post("/register", validatorRegister, register);

module.exports = router;