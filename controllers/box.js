const Boxes = require("../models").Box;
const Item = require("../models").Item;
const BoxImages = require("../models").BoxImages;
const { Op } = require("sequelize");
const { yandexMiddlware } = require("../middlewares/yandex");

const create = async (req, res) => {
  try {
    const { name, ownerId, desc, lat, lng, interval, timeZone, itemsId } =
      req.body;
    const allItems = await Item.findAll({
      where: {
        p2: {
          [Op.like]: "%" + String(ownerId) + "%",
        },
      },
    });
    await Promise.all(
      allItems.map(async (item) => {
        const entery = await Item.findOne({
          where: { p2: item.dataValues.p2 },
        });
        if (await entery) {
          entery.p5 = itemsId;
          await entery.save();
        }
      })
    );
    const box = await Boxes.create({
      name,
      desc,
      ownerId,
      lat,
      lng,
      interval,
      timeZone,
      itemsId,
    });

    return res.json({ succes: true, data: box });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.body;

    await Boxes.destroy({ where: { id } });

    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const edit = async (req, res) => {
  try {
    const { id, name, desc, lat, lng, interval, timeZone, itemsId, ownerId } =
      req.body;
    const allItems = await Item.findAll({
      where: {
        p2: {
          [Op.like]: "%" + String(ownerId) + "%",
        },
      },
    });

    const box = await Boxes.findOne({ where: { id } });
    box.name = name;
    box.desc = desc;
    box.lat = lat;
    box.lng = lng;
    box.interval = interval;
    box.timeZone = timeZone;
    box.itemsId = itemsId;
    await box.save();

    await Promise.all(
      allItems.map(async (item) => {
        const entery = await Item.findOne({
          where: { p2: item.dataValues.p2 },
        });
        if (await entery) {
          entery.p5 = itemsId;
          await entery.save();
        }
        console.log(entery, ownerId, itemsId, item.dataValues.p2, "----");
      })
    );
    return res.json({ succes: true, data: box });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAllBoxesOfOwners = async (req, res) => {
  const { ownerId, boxId } = req.query;
  const offset = Number.parseInt(req.query.offset) || 0;
  const limit = Number.parseInt(req.query.limit) || 12;
  const queryObj = {};
  if (boxId) {
    queryObj["p5"] = {
      [Op.eq]: boxId,
    };
  }
  const count = await Boxes.findAll({ where: { ownerId } });

  try {
    const allUsers = await Boxes.findAll({
      where: {
        ownerId,
      },
      offset: offset * limit,
      limit,
    });

    const items = await Item.findAll({
      where: {
        ...queryObj,
        p2: {
          [Op.like]: "%" + String(ownerId) + "%",
        },
      },
    });
    console.log(items, "000000");
    return res.json({
      items,
      paginateData: allUsers,
      count: count.length,
    });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAllBoxes = async (req, res) => {
  try {
    const { id } = req.query;

    const queryObj = {};
    if (id) {
      queryObj["id"] = {
        [Op.eq]: id,
      };
    }
    const allUsers = await Boxes.findAll({
      where: queryObj,
    });
    const items = await Item.findAll({
      where: {
        p2: {
          [Op.like]: "%" + String(allUsers[0]?.ownerId) + "%",
        },
      },
    });
    return res.json({
      succes: true,
      data: allUsers,
      posts: items,
    });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAllBoxesYandex = async (req, res) => {
  try {
    const { id } = req.query;
    const haveApiKey = await yandexMiddlware(req.headers.apikey);
    if (!haveApiKey) {
      return res.json({
        error: ["apiKey are not valid"],
      });
    }
    const queryObj = {};
    if (id) {
      queryObj["id"] = {
        [Op.eq]: id,
      };
    }
    const allUsers = await Boxes.findAll({
      where: queryObj,
    });
    const items = await Item.findAll({
      where: {
        p2: {
          [Op.like]: "%" + String(allUsers[0]?.ownerId) + "%",
        },
      },
    });
    return res.json({
      succes: true,
      data: allUsers,
      posts: items,
    });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const createBoxImage = async (req, res) => {
  try {
    const { boxId, image } = req.body;
    const box = await BoxImages.create({ boxId, image });
    return res.json({ succes: true, data: box });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const destroyBoxImage = async (req, res) => {
  try {
    const { id } = req.body;
    await BoxImages.destroy({ where: { id } });
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getBoxImages = async (req, res) => {
  try {
    const { boxId } = req.query;

    const images = await BoxImages.findAll({ where: { boxId } });
    return res.json({ succes: true, data: images });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getBoxImagesYandex = async (req, res) => {
  try {
    const { boxId } = req.query;
    const haveApiKey = await yandexMiddlware(req.headers.apikey);
    if (!haveApiKey) {
      return res.json({
        error: ["apiKey are not valid"],
      });
    }
    const images = await BoxImages.findAll({ where: { boxId } });
    return res.json({ succes: true, data: images });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  create,
  edit,
  getAllBoxesOfOwners,
  getAllBoxes,
  destroy,
  createBoxImage,
  destroyBoxImage,
  getBoxImages,
  getAllBoxesYandex,
  getBoxImagesYandex,
};
