const YandexUser = require("../models").YandexUser;

const yandexMiddlware = async (apiKey) => {
  try {
    const haveApiKey = await YandexUser.findOne({ where: { apiKey } });
    if (haveApiKey) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  yandexMiddlware,
};
