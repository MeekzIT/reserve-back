const { filtedModes, filtedTypes, mergeByModeId, mergeByTypeId } = require("../services/item");
const Item = require("../models").Item;
const ItemModes = require("../models").ItemModes;
const ItemTypes = require("../models").ItemTypes;
const { Op } = require("sequelize");

const edit = async (req, res) => {
  try {
    const { id, name, access } = req.body;
    const box = await Item.findOne({ where: { p2: id } });
    box.name = name;
    box.access = access;
    await box.save();
    return res.json({ succes: true, data: box });
  } catch (e) {
    console.log("something went wrong", e);
  }
};
//////////////////////// mode ////////////////////////////
const addMode = async (req, res) => {
  try {
    const { id, modeId } = req.body;
    await ItemModes.create({ p2: id, modeId });

    const data = await filtedModes(id);

    return res.json({ succes: true, ...data });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const destroyMode = async (req, res) => {
  try {
    const { id, p2 } = req.body;
    await ItemModes.destroy({ where: { id } });
    const data = await filtedModes(p2);
    return res.json({ succes: true, ...data });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getItemModes = async (req, res) => {
  try {
    const { id } = req.query;
    const data = await filtedModes(id);
    return res.json({ succes: true, ...data });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getBoxModes = async (req, res) => {
  try {
    const { ownerId, boxId } = req.query;
    const items = await Item.findAll({
      where: {
        p2: {
          [Op.like]: "%" + String(ownerId) + "%",
        },
        p5: boxId,
        access: true,
      },
    });
    const subjects = [];
    await Promise.all(
      await items.map(async (i) => {
        const entery = await filtedModes(i.p2);
        return subjects.push(...entery.data);
      })
    );
    return res.json({
      succes: true,
      data: mergeByModeId(subjects),
    });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const editItemModes = async (req, res) => {
  try {
    const { id, price } = req.body;
    const data = await ItemModes.findOne({
      where: {
        id,
      },
    });
    data.price = price;
    await data.save();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};
////////////////////// type ///////////////////////

const addType = async (req, res) => {
  try {
    const { id, typeId } = req.body;
    await ItemTypes.create({ p2: id, typeId });

    const data = await filtedTypes(id);

    return res.json({ succes: true, ...data });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const destroyType = async (req, res) => {
  try {
    const { id, p2 } = req.body;
    await ItemTypes.destroy({ where: { id } });
    const data = await filtedTypes(p2);

    return res.json({
      succes: true,
      ...data,
    });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getItemType = async (req, res) => {
  try {
    const { id } = req.query;
    const data = await filtedTypes(id);

    return res.json({ succes: true, ...data });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getBoxType = async (req, res) => {
  try {
    const { ownerId, boxId } = req.query;
    const items = await Item.findAll({
      where: {
        p2: {
          [Op.like]: "%" + String(ownerId) + "%",
        },
        p5: boxId,
        access: true,
      },
    });
    const subjects = [];
    await Promise.all(
      await items.map(async (i) => {
        const entery = await filtedTypes(i.p2);
        return subjects.push(...entery.data);
      })
    );
    return res.json({
      succes: true,
      data: mergeByTypeId(subjects),
    });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const editItemType = async (req, res) => {
  try {
    const { id, price } = req.body;
    const data = await ItemTypes.findOne({
      where: {
        id,
      },
    });
    data.price = price;
    await data.save();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  edit,
  addMode,
  destroyMode,
  getItemModes,
  getBoxModes,
  editItemModes,
  addType,
  destroyType,
  getItemType,
  getBoxType,
  editItemType,
};
