/* const { matchedData } = require("express-validator");
const User = require("../models/user");
const { handleHttpError } = require("../utils/handleError");
const { tokenSign } = require("../utils/handleToken");
const { encrypt, compare } = require("../utils/handlePassword");
const BankAccount = require("../models/bankAccount");
const login = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await User.findOne({
      where: {
        email: req.email,
      },
    });
    if (!user) {
      handleHttpError(res, "USER_NOT_EXISTS", 404);
      return;
    }
    const hashPassword = user.get("password");
    const check = await compare(req.password, hashPassword);
    if (!check) {
      handleHttpError(res, "USER_AND-OR_PASSWORD_INVALID", 401);
      return;
    }
    user.set("password", undefined, { strict: false });
    const tokenJwt = await tokenSign(user);
    const data = {
      token: tokenJwt,
      user,
    };
    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};
const register = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const dataUser = await User.create(body);
    dataUser.set("password", undefined, { strict: false });
    const data = {
      user: dataUser,
      token: await tokenSign(dataUser),
    };
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

const getUserBankAccounts = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await BankAccount.findAll({
      where: { userId: id },
    });
    res.json(data);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_BANK_ACCOUNTS");
  }
};

module.exports = { login, register, getUserBankAccounts };
 */


const User = require('../models/user');
const {handleHttpError} = require('../utils/handleError');
const { matchedData } = require('express-validator');
const {encrypt,compare } = require('../utils/handlePassword');
const { tokenSign } = require('../utils/handleJwt');

const authController = {
     //Loguearse al sistema
     login: async function (req, res) {
        try {
            req = matchedData(req);
            const user = await User.findOne({email:req.email}).select('name email password');
            if (!user) {
                handleHttpError(res,'Email y/o contrasenia incorrectos.',404);
                return
            }
            const hashPassword = user.get('password');
            const check = await compare(req.password, hashPassword);
            if (!check) {
                handleHttpError(res, 'Email y/o contrasenia incorrectos.',401);
                return
            }
            user.set('password', undefined, {strict:false})
            const data = {
                token: await tokenSign(user),
                user
            }
            res.send({data})
        } catch (error) {
          handleHttpError(res, error);
        }
      },
      //Registrar un user
      register: async function (req, res) {
        try {
            req = matchedData(req);
            const password = await encrypt(req.password);
            const body = {...req, password}
            const dataUser = await User.create(body);
            //No mostrar la password cuando se hace el registro
            dataUser.set('password',undefined,{strict:false})
            const data = {
                token: await tokenSign(dataUser),
                user: dataUser,
            }
            res.send({data})
        } catch (error) {
          handleHttpError(res, 'ERROR_REGISTER_USER');
        }
      },  

}

module.exports = authController;