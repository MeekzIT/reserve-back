const Owner = require("../models").Owner;
const Contry = require("../models").Country;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const create = async (req, res) => {
  try {
    const {
			firstName,
			lastName,
			email,
			password,
			phoneNumber,
			countryId,
			userId,
			deviceOwner,
		} = req.body
    const oldUser = await Owner.findOne({
      where: { email, role: "owner" },
    });
    if (oldUser) {
      return res.json({ message: "alredy exist" });
    } else {
      let encryptedPassword = await bcrypt.hash(password, 10);
      const newUser = await Owner.create({
        firstName,
        lastName,
        email: email.toLowerCase(),
        phoneNumber,
        password: encryptedPassword,
        subscribe: false,
        countryId,
        role: "owner",
        deviceOwner,
        userId,
      });
      const user = await Owner.findOne({
        where: { id: newUser.id },
        include: [
          {
            model: Contry,
          },
        ],
      });
      return res.json({ succes: true, data: user });
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAll = async (req, res) => {
  const { search } = req.query;
  const offset = Number.parseInt(req.query.offset) || 0;
  const limit = Number.parseInt(req.query.limit) || 12;
  const count = await Owner.findAll();

  try {
    const allUsers = await Owner.findAll({
      where: {},
      offset: offset * limit,
      limit,
      include: [
        {
          model: Contry,
        },
      ],
    });
    return res.json({ paginateData: allUsers, count: count.length });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAllOwnersOfUser = async (req, res) => {
  const { id } = req.query;
  const offset = Number.parseInt(req.query.offset) || 0;
  const limit = Number.parseInt(req.query.limit) || 12;
  const count = await Owner.findAll({ where: { userId: id } });
  let queryObj = {};

  try {
    const allUsers = await Owner.findAll({
      where: {
        ...queryObj,
        userId: id,
      },
      offset: offset * limit,
      limit,
      include: [
        {
          model: Contry,
        },
      ],
    });
    return res.json({ paginateData: allUsers, count: count.length });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getSingle = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const user = await Owner.findOne({
        where: { id: id },
        include: [
          {
            model: Contry,
          },
        ],
      });
      return res.json(user);
    } else return res.json(true);
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const delateAccount = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await Owner.findOne({ where: { id } });
    await user.destroy();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  create,
  getAll,
  getAllOwnersOfUser,
  getSingle,
  delateAccount,
};
