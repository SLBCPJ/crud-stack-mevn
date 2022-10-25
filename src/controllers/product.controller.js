const Product = require("../models/product");
const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await Product.create(body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};
const getItems = async (req, res) => {
  try {
    //ver cual usuario esta haciendo la peticion
    // const user = req.user
    const data = await Product.find({});
    // res.json({data, user});
    res.json(data);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};
const getItem = async ({params}, res) => {
  try {
    const _id = params.id;
    const data = await Product.findOne({_id});
    res.json(data);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};
const updateItem = async (req, res) => {
  try {
    const _id = req.params.id;
    const body = req.body;
    const data = await Product.findByIdAndUpdate(_id, body, {
      new: true,
    });
    res.json({data});
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_ITEM");
  }
};
const deleteItem = async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await Product.findByIdAndDelete(_id);
    if (!data) {
      return res.status(404).json({
        message: "ID_NOT_FOUND",
      });
    }
    res.send(data);
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

module.exports = { createItem, getItems, getItem, deleteItem, updateItem };
