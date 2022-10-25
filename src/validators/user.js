const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");
const validatorRegister = [
  check("name")
    .exists()
    .notEmpty()
    .withMessage("Name field is required")
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "The Product Name field can only contain a minimum of 3 and a maximum of 100 characters respectively"
    ),
  check("email")
    .exists()
    .notEmpty()
    .withMessage("E-mail field is required")
    .isEmail(),
  check("password")
    .exists()
    .notEmpty()
    .withMessage("Password field is required")
    .isLength({ min: 8, max: 50 })
    .withMessage(
      "The Product Name field can only contain a minimum of 3 and a maximum of 50 characters respectively"
    ),
  (req, res, next) => validateResults(req, res, next),
];
const validatorLogin = [
  check("email")
    .exists()
    .notEmpty()
    .withMessage("E-mail field is required")
    .isEmail(),
  check("password")
    .exists()
    .notEmpty()
    .withMessage("Password field is required")
    .isLength({ min: 3, max: 50 }),
  (req, res, next) => validateResults(req, res, next),
];

module.exports = { validatorRegister, validatorLogin };
