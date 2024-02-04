const Item = require("../models").Item;
const axios = require("axios");

const getAll = async () => {
  try {
    axios
      .get(`${process.env.SERVER_URL}/devices`)
      .then(async function (response) {
        await Item.destroy({
          where: {},
          truncate: true,
        });
        await response.data.map(async (item) => {
          await Item.create({
            p0: item.p0,
            name: item.name,
            p2: item.p2, // ownerId
            p5: item.p5, // moikaID
            datatime: item.datatime,
            access: true,
          });
          console.log("--------------------- ready --------------------------");
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getSingle = async (ownerId, active) => {
  try {
    axios
      .get(`${process.env.SERVER_URL}/devices/?ID=${ownerId}`)
      .then(async (response) => {
        const item = await Item.findOne({
          where: { p2: String(ownerId) },
        });
        await item.update({
          p0: response.data[0].p0,
          name: response.data[0].name,
          p2: response.data[0].p2, // ownerId
          p5: response.data[0].p5, // moikaID
          datatime: response.data[0].datatime,
        });
        console.log("--------------------- updated --------------------------");
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const setReserve = async (data) => {
  try {
    console.log(
      data,
      "--------------------- success --------------------------"
    );
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  getAll,
  getSingle,
  setReserve,
};
