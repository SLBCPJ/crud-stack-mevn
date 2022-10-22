const User = require("../models/user");
const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleToken");
const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "NOT_TOKEN: NEDD_SESSION", 401);
      return;
    }
    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token);
    if (!dataToken._id) {
      handleHttpError(res, "ERROR_ID_TOKEN", 401);
      return;
    }
    const user = await User.findById(dataToken._id)
    req.user = user
    next();
  } catch (error) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

module.exports = authMiddleware;
