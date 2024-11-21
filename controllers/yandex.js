const YandexUser = require("../models").YandexUser;
const { v4: uuidv4 } = require("uuid");

const login = async (req, res) => {
  try {
    const { email, password, user } = req.body;
    if (
      !user &&
      email !== "yandex" &&
      password !== "yandex-integration-test-env"
    ) {
      return res.status(400).json({
        error: ["Password and email are required fields"],
      });
    }
    const existedUser = await YandexUser.findOne({ where: { user } });
    if (existedUser) {
      const newApiKey = uuidv4();
      existedUser.apiKey = newApiKey;
      await existedUser.save();
      return res.json({ succes: true, apiKey: newApiKey });
    } else {
      const newApiKey = uuidv4();
      await YandexUser.create({ user, apiKey: newApiKey });
      return res.json({ succes: true, apiKey: newApiKey });
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const logout = async (req, res) => {
  try {
    const { user } = req.body;
    if (!user) {
      return res.status(400).json({
        error: ["user are required field"],
      });
    }
    const existedUser = await YandexUser.findOne({ where: { user } });
    if (existedUser) {
      existedUser.destroy();
      return res.json({ succes: true, apiKey });
    } else {
      return res.status(400).json({
        error: ["user are not valid"],
      });
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  login,
  logout,
};
