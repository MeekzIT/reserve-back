const Contry = require("../models").Country;

const create = async (req, res) => {
  try {
    const { name, short } = req.body;
    await Contry.create({ name, short });
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const edit = async (req, res) => {
  try {
    const { id, name, short } = req.body;
    const country = await Contry.findOne({ where: { id } });
    country.name = name;
    country.short = short;
    await country.save();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const del = async (req, res) => {
  try {
    const { id } = req.body;
    await Contry.destroy({ where: { id } });
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAll = async (req, res) => {
  try {
    const country = await Contry.findAll();
    return res.json(country);
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  create,
  edit,
  del,
  getAll,
};
