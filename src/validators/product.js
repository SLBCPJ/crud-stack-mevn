const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");
const validatorCreate = [
  check("name")
    .exists()
    .notEmpty()
    .withMessage("Name field is required")
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "The Product Name field can only contain a minimum of 3 and a maximum of 100 characters respectively"
    ),
  check("price")
    .exists()
    .notEmpty()
    .withMessage("Price field is required")
    .isFloat({ min: 100, max: 1000000 })
    .withMessage(
      "The product Price field can only contain a minimum of 100 and a maximum of 1000000 digits respectively"
    ),
  check("stock")
    .exists()
    .notEmpty()
    .withMessage("Stock field is required")
    .isInt({ min: 0, max: 999 })
    .withMessage("The product Stock cannot exceed 999 digits"),
  (req, res, next) => validateResults(req, res, next),
];
const validatorUpdate = [
  check("name")
    .exists()
    .notEmpty()
    .withMessage("Name field is required")
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "The Product Name field can only contain a minimum of 3 and a maximum of 100 characters respectively"
    ),
  check("price")
    .exists()
    .notEmpty()
    .withMessage("Price field is required")
    .isFloat({ min: 100, max: 1000000 })
    .withMessage(
      "The product Price field can only contain a minimum of 100 and a maximum of 1000000 digits respectively"
    ),
  check("stock")
    .exists()
    .notEmpty()
    .withMessage("Stock field is required")
    .isInt({ min: 0, max: 999 })
    .withMessage("The product Stock cannot exceed 999 digits"),
  (req, res, next) => validateResults(req, res, next),
];

module.exports = { validatorCreate, validatorUpdate };
