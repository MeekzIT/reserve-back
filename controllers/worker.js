const Boxes = require("../models").Box;
const Worker = require("../models").Worker;
const Owner = require("../models").Owner;
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { generateTimeSlots, mergeTimeIntervals } = require("../services/worker");

const create = async (req, res) => {
  try {
    const { firstName, lastName, email, password, boxId, startHour, endHour } =
      req.body;
    const box = await Boxes.findOne({
      where: { id: boxId },
      include: [
        {
          model: Owner,
        },
      ],
    });

    const oldUser = await Worker.findOne({
      where: { email },
    });
    if (oldUser) {
      return res.json({ message: "alredy exist" });
    } else {
      let encryptedPassword = await bcrypt.hash(password, 10);
      const worker = await Worker.create({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: encryptedPassword,
        countryId: box.Owner.countryId,
        role: "worker",
        boxId,
        startHour,
        endHour,
        hours: "",
      });
      worker.hours = JSON.stringify(
        await generateTimeSlots(startHour, endHour, box.interval, worker.id)
      );
      await worker.save();
      return res.json({ succes: true, data: worker });
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const editWorker = async (req, res) => {
  try {
    const { id, password, startHour, endHour } = req.body;
    const worker = await Worker.findOne({
      where: { id },
    });
    let encryptedPassword = await bcrypt.hash(password, 10);
    worker.password = encryptedPassword;
    worker.startHour = startHour;
    worker.endHour = endHour;
    await worker.save();
    return res.json({ succes: true, data: worker });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.body;
    await Worker.destroy({
      where: { id },
    });
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getWorkers = async (req, res) => {
  try {
    const { id } = req.query;
    const workers = await Worker.findAll({
      where: { boxId: id },
    });
    return res.json({ succes: true, data: workers });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getWorkerHours = async (req, res) => {
  try {
    const { id } = req.query;
    const workers = await Worker.findAll({
      where: { boxId: id },
    });
    const allTimers = [];
    await Promise.all(
      await workers.map(async (item) => {
        console.log(item);

        workerTimer = JSON.parse(item.hours);
        allTimers.push(...workerTimer);
      })
    );
    return res.json({
      succes: true,
      data: mergeTimeIntervals(allTimers),
    });
  } catch (e) {
    console.log("something went wrong", e);
  }
};


module.exports = {
  create,
  editWorker,
  getWorkers,
  destroy,
  getWorkerHours,
};
