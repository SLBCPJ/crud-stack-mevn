const User = require("../models/user");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleToken");

const authController = {
  //Loguearse al sistema
  login: async function (req, res) {
    try {
      req = matchedData(req);
      const user = await User.findOne({ email: req.email }).select(
        "name email password"
      );
      if (!user) {
        handleHttpError(res, "USER_NOT_EXISTS", 404);
        return;
      }
      const hashPassword = user.get("password");
      const check = await compare(req.password, hashPassword);
      if (!check) {
        handleHttpError(res, "Wrong e-mail and/or password.", 401);
        return;
      }
      user.set("password", undefined, { strict: false });
      const data = {
        token: await tokenSign(user),
        user,
      };
      res.send(data)
    } catch (error) {
      handleHttpError(res, error);
    }
  },
  //Registrar un user
  register: async function (req, res) {
    try {
      req = matchedData(req);
      const password = await encrypt(req.password);
      const body = { ...req, password };
      const dataUser = await User.create(body);
      //No mostrar la password cuando se hace el registro
      dataUser.set("password", undefined, { strict: false });
      const data = {
        token: await tokenSign(dataUser),
        user: dataUser,
      };
      res.send(data);
    } catch (error) {
      handleHttpError(res, "ERROR_REGISTER_USER");
    }
  },
};

module.exports = authController;
