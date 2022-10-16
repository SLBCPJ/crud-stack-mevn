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
    if (!dataToken) {
      handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
      return;
    }
    // Hacer una trazabilidad de cual usuario esta accediendo a dichas rutas y/o controlador
    const user = await User.findOne({
      where: {
        id: dataToken.id,
      },
    });
    req.user = user;
    next();
  } catch (error) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

module.exports = authMiddleware;
