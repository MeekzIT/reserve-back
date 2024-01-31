const Category = require("../models").Category;

const create = async (req, res) => {
  try {
    const { nameAm, nameRu, nameEn, nameGe, nameAz } = req.body;
    await Category.create({ nameAm, nameRu, nameEn, nameGe, nameAz });
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const edit = async (req, res) => {
  try {
    const { id, nameAm, nameRu, nameEn, nameGe, nameAz } = req.body;

    const country = await Category.findOne({ where: { id } });
    country.nameAm = nameAm;
    country.nameRu = nameRu;
    country.nameEn = nameEn;
    country.nameGe = nameGe;
    country.nameAz = nameAz;
    await country.save();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const del = async (req, res) => {
  try {
    const { id } = req.body;
    await Category.destroy({ where: { id } });
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAll = async (req, res) => {
  try {
    const country = await Category.findAll();
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
