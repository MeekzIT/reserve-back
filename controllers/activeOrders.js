const ReservePoints = require("../models").ReservePoints;
const Order = require("../models").Order;
const Box = require("../models").Box;
const { Op } = require("sequelize");
const { setReserve } = require("../services/requests");

const getAll = async (req, res) => {
  try {
    const data = await ReservePoints.findAll();

    return res.json({
      succes: true,
      data,
    });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const destroyAll = async (req, res) => {
  try {
    const { id } = req.body;
    await ReservePoints.destroy({
      where: { id },
    });
    return res.json({
      succes: true,
    });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getUserActives = async (req, res) => {
  try {
    const { user_id } = req.user;

    const data = await ReservePoints.findAll({
      where: {
        userId: user_id,
        success: false,
      },
      include: [{ model: Order, include: Box }],
    });

    return res.json({
      succes: true,
      data,
    });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const activatePoint = async (req, res) => {
  try {
    const { id } = req.body;

    const data = await ReservePoints.findOne({
      where: {
        id,
      },
    });
    const order = await Order.findOne({
      where: { id: data.dataValues.orderId },
    });
    await setReserve({
      OwnerID: data.dataValues.point,
      Money: order.dataValues.price,
      Reserv: 0,
    });
    data.success = true;
    await data.save();
    return res.json({
      succes: true,
    });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  getAll,
  destroyAll,
  getUserActives,
  activatePoint,
};
