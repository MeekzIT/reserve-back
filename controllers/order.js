const Users = require("../models").User;
const Order = require("../models").Order;
const Owner = require("../models").Owner;
const Boxes = require("../models").Box;
const Worker = require("../models").Worker;
const ReservePoints = require("../models").ReservePoints;
const Category = require("../models").Category;
const Type = require("../models").Type;

const { Op } = require("sequelize");
const { setReserve } = require("../services/requests");
const {
  removeWorkerDate,
  subtractIntervalFromDate,
} = require("../services/worker");
const { setPayment } = require("../services/payment");
const { yandexMiddlware } = require("../middlewares/yandex");

//----------- order statuses ------------//
//                                       //
//order start     -> "start"      //
//payment success -> "succes"     //
//payment faild   -> "faild"      //
//new payment     -> "in_progres" //
//order canceled  -> "canacel"    //
//order finish    -> "finish"       //
//                                       //
//---------------------------------------//

const create = async (req, res) => {
  try {
    const { boxId, post, price, worker, modes, time } = req.body;
    const { user_id } = req.user;
    const newOrder = await Order.create({
      boxId,
      post,
      price,
      worker,
      modes,
      time,
      userId: user_id,
      payment: process.env.ORDER_START,
    });

    const paymentStatus = await setPayment(price, newOrder.id);
    console.log(paymentStatus, "paymentStatus");
    if (paymentStatus) {
      newOrder.orderId = paymentStatus.orderId;
      await newOrder.save();
      return res.json({
        succes: true,
        data: paymentStatus.data,
      });
    }
    newOrder.payment = process.env.ORDER__PAYMENT_FAILD;
    await newOrder.save();

    return res.json({
      succes: false,
    });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const registratedOrder = async (req, res) => {
  const { orderId } = req.body;
  const { user_id } = req.user;

  const newOrder = await Order.findOne({
    where: { orderId },
  });
  newOrder.payment = process.env.ORDER__PAYMENT_SUCCESS;
  await newOrder.save();
  if (newOrder.time == "now") {
    await setReserve({
      OwnerID: newOrder.post,
      Money: newOrder.price,
      Reserv: 0,
    });
  }
  if (newOrder.worker) {
    const dates = await removeWorkerDate(newOrder.boxId, newOrder.time);
    newOrder.workerId = dates.id;
    await newOrder.save();
    const box = await Boxes.findOne({
      where: { id: newOrder.boxId },
    });
    const resetveTime = subtractIntervalFromDate(
      newOrder.time,
      Number(box.interval),
      Number(box.timeZone.slice(3, box.timeZone.length))
    );
    await ReservePoints.create({
      orderId: newOrder.id,
      time: resetveTime,
      userId: user_id,
      success: false,
      point: null,
    });
  }
  return res.json({
    succes: true,
    data: newOrder,
  });
};

const getOrdersOfWorker = async (req, res) => {
  try {
    const { user_id } = req.user;
    const orders = await Order.findAll({
      where: { workerId: user_id, payment: process.env.ORDER__PAYMENT_SUCCESS },
    });
    const allEnterys = [];
    await Promise.all(
      await orders.map(async (entery) => {
        let enteryModes = [];
        const user = await Users.findOne({
          where: { id: entery.userId },
        });
        await Promise.all(
          await JSON.parse(entery.modes).map(async (i) => {
            const mode = await Category.findOne({ where: { id: i } });
            await enteryModes.push(mode);
          })
        );
        await allEnterys.push({ ...entery.dataValues, enteryModes, user });
      })
    );

    return res.json({
      succes: true,
      data: allEnterys,
    });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getOrdersOfUser = async (req, res) => {
  try {
    const { user_id } = req.user;
    const orders = await Order.findAll({
      where: { userId: user_id },
      order: [["createdAt", "DESC"]],
    });
    const allEnterys = [];
    await Promise.all(
      await orders.map(async (entery) => {
        let enteryModes = [];
        const user = await Users.findOne({
          where: { id: entery.userId },
        });
        const box = await Boxes.findOne({
          where: { id: entery.boxId },
        });
        await Promise.all(
          await JSON.parse(entery.modes).map(async (i) => {
            const mode = await Category.findOne({ where: { id: i } });
            await enteryModes.push(mode);
          })
        );
        await allEnterys.push({ ...entery.dataValues, enteryModes, user, box });
      })
    );

    return res.json({
      succes: true,
      data: allEnterys,
    });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getOrderOfUser = async (req, res) => {
  try {
    const { id } = req.query;
    const orders = await Order.findOne({
      where: { id },
    });
    const box = await Boxes.findOne({
      where: { id: orders.dataValues.boxId },
    });
    const worker = await Worker.findOne({
      where: { id: orders.dataValues.workerId },
    });
    let enteryModes = [];
    await Promise.all(
      await JSON.parse(orders.modes).map(async (i) => {
        const mode = await Category.findOne({ where: { id: i } });
        await enteryModes.push(mode);
      })
    );
    return res.json({
      succes: true,
      data: { ...orders.dataValues, enteryModes, box, worker },
    });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const destroyOrder = async (req, res) => {
  try {
    const { id } = req.body;
    await Order.destroy({
      where: { id },
    });

    return res.json({
      succes: true,
    });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const yandexOrder = async (req, res) => {
  try {
    const { post, price, apiKey } = req.body;
    const haveApiKey = await yandexMiddlware(apiKey);
    if (!haveApiKey) {
      return res.json({
        error: ["apiKey are not valid"],
      });
    }
    await setReserve({
      OwnerID: post,
      Money: price,
      Reserv: 0,
    });

    return res.json({
      succes: true,
    });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  create,
  registratedOrder,
  getOrdersOfWorker,
  destroyOrder,
  getOrdersOfUser,
  getOrderOfUser,
  yandexOrder,
};
