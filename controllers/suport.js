const Suport = require("../models").Suport;
const Users = require("../models").User;
const Admin = require("../models").Admin;
const Contry = require("../models").Country;

const createQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    const { user_id } = req.user;
    const user = await Users.findOne({
      where: { id: user_id },
      include: [
        {
          model: Contry,
        },
      ],
    });
    await Suport.create({
      userId: user_id,
      question,
      countryId: user.countryId,
    });

    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const answerQuestion = async (req, res) => {
  try {
    const { id, answer } = req.body;
    const question = await Suport.findOne({
      where: { id },
    });
    question.answer = answer;
    await question.save();

    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const destroyQuestion = async (req, res) => {
  try {
    const { id } = req.body;
    const { user_id } = req.user;

    const question = await Suport.findOne({
      where: { id },
    });
    await question.destroy();
    const admin = await Admin.findOne({ where: { id: user_id } });
    const suport = await Suport.findAll({
      where: { countryId: admin.countryId },
      include: [
        {
          model: Users,
        },
      ],
    });
    return res.json({ succes: true, data: suport });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAdminQuestion = async (req, res) => {
  try {
    const { user_id } = req.user;
    const admin = await Admin.findOne({ where: { id: user_id } });

    const suport = await Suport.findAll({
      where: { countryId: admin.countryId, answer: null },
      include: [
        {
          model: Users,
        },
      ],
    });

    return res.json({ succes: true, data: suport });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAdminHistory = async (req, res) => {
  try {
    const { user_id } = req.user;
    const admin = await Admin.findOne({ where: { id: user_id } });

    const suport = await Suport.findAll({
      where: { countryId: admin.countryId },
      include: [
        {
          model: Users,
        },
      ],
    });

    return res.json({ succes: true, data: suport });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getUserHistory = async (req, res) => {
  try {
    const { user_id } = req.user;

    const suport = await Suport.findAll({
      where: { userId: user_id },
    });

    return res.json({ succes: true, data: suport });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  createQuestion,
  answerQuestion,
  destroyQuestion,
  getAdminQuestion,
  getAdminHistory,
  getUserHistory,
};
